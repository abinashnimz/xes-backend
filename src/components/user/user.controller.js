import constant from '../../constant.js';
import User from './user.model.js';
import * as UserValidation from "./user.validation.js";
import * as AuthService from "../../services/auth.service.js";
import customMongooseAbstract from "../../services/mongoose.abstract.js";



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
		res.status(constant.RESPONSE.OK.STATUS).send({ message: 'Registration Successful' });

	} catch (error) {
        console.log(error);
		if (constant.APP_DEBUG) res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		else res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}