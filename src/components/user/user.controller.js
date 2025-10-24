import constant from '../../constant.js';
import User from './user.model.js';
import * as UserValidation from "./user.validation.js";
import * as AuthService from "../../services/auth.service.js";
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
		await mongooseAbstract.create(data).then(user => user.toObject());
		// auth token creation codes will go here

		res.status(constant.RESPONSE.OK.STATUS).send({ message: 'Registration Successful' });

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
		if (!user) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json({ message: 'User account doesn\'t exist!', type: 'email-error' })
		const isUserValid = await AuthService.comparePasswordBcrypt(validatedData.criteria.password, user.password)
		if (!isUserValid) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'Incorrect Password', type: 'password-error' })
		//Email verification login goes here
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