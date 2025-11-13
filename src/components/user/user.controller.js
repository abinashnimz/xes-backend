import constant from '../../constant.js';
import User from './user.model.js';
import * as UserValidation from "./user.validation.js";
import * as AuthService from "../../services/auth.service.js";
import * as EmailService from "../emailer/emailerService.js";
import customMongooseAbstract from "../../services/mongoose.abstract.js";

import fp from '../../services/fp.service.js'
const { pick } = fp



const mongooseAbstract = customMongooseAbstract(User);

export const signup = async (req, res) => {
	try {
        const validatedData = await UserValidation.signup.validateAsync(req.body);
		const { data } = validatedData;
		const emailCount = await mongooseAbstract.countDocuments({ email: { $regex: `^${data.email}$`, $options: 'i' } });
		const usernameCount = await mongooseAbstract.countDocuments({ username: { $regex: `^${data.username}$`, $options: 'i' } });
		if (emailCount > 0) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ message: 'Email already exists', type: 'email-error' });
		if (usernameCount > 0) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ message: 'Username already exists', type: 'username-error' });
        data.password = await AuthService.hashPasswordBcrypt(data.password);
		const createdUser = await mongooseAbstract.create(data).then(user => user.toObject());
		const emailToken = AuthService.getEmailVerificationToken(createdUser);
		console.log(`Email token from user-controller: ${emailToken}`);
		EmailService.sendEmailVerificationMail(createdUser.username, emailToken, createdUser.email);
		res.status(constant.RESPONSE.OK.STATUS).setHeader("Authorization", `Bearer ${emailToken}`).send({ message: 'A verification mail sent to your email' });
	} catch (error) {
        console.log(error);
		if(error) res.status(400).send(error);
		if (constant.APP_DEBUG) res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		else res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const login = async (req, res) => {
	try {
		const validatedData = await UserValidation.login.validateAsync(req.body);
		const criteria = {email:validatedData.criteria.email};
		console.log(validatedData);
		const user = await mongooseAbstract.findOne(criteria);
		if (!user) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ message: 'User account doesn\'t exist!', type: 'email-error' });
		const isUserValid = await AuthService.comparePasswordBcrypt(validatedData.criteria.password, user.password)
		if (!isUserValid) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'Incorrect Password', type: 'password-error' });
		//Email verification login goes here
		const isUserVerified = user.isVerified;
		if (!isUserVerified) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'Please verify you email', type: 'verification-pending' });
		if (user.isBanned) {
			return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'You are banned! Please contact admin', type: 'email-error' })
		}
		const token = AuthService.generateAuthToken(user);
		console.log(`Token is: ${token}`);
		return res.json({ ...pick(['username', 'role', '_id'], user), token });
	} catch (error) {
		console.log(error)
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const verifyEmail = async (req, res) => {
	try {
		const _id = req?.user?.userId;
		console.log(_id);
		if (!_id) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json('Invalid Token');
		const user = await mongooseAbstract.findOne({ _id }, 'isVerified');
		console.log(user);
		if (!user) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json('Invalid User ID');
		if (user.isVerified) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ message: 'User already verified', type: 'email verification' });
		await mongooseAbstract.updateOne(_id, { isVerified: true });
		return res.status(constant.RESPONSE.OK.STATUS).json({ message: 'Email verification successful', type: 'email verification' });
	} catch (error) {
		console.log(error)
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const sendPasswordVerification = async (req, res) => {
	try {
		const validatedData = await UserValidation.sendPasswordVerification.validateAsync(req.body);
		const { data } = validatedData;
		const user = await mongooseAbstract.findOne({ email: data.email });
		if (!user) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ type: 'email-error', message: 'Email not exist in database' });
		const emailToken = AuthService.getPasswordRecoveryToken(user);
		EmailService.sendPasswordRecoveryMail(user.username, emailToken, user.email);
		return res.status(constant.RESPONSE.OK.STATUS).send({ type: 'success', message: 'Password recovery mail send Successfully' });
	} catch (error) {
		console.log(error);
	}
}

export const resetPassword = async (req, res) => {
	try {
		const validatedData = await UserValidation.resetPassword.validateAsync(req.body);
		const { data } = validatedData;
		console.log(`Validation Password Data: ${JSON.stringify(data)}`);
		data.password = await AuthService.hashPasswordBcrypt(data.password);
		await mongooseAbstract.updateOne(req.user.userId, { password: data.password });
		return res.status(constant.RESPONSE.OK.STATUS).send({ type: 'success', message: 'Password Reset Successfully' });
	} catch (error) {
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error);
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS);
	}
}