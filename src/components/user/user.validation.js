import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
Joi.objectId = JoiObjectId(Joi)

export const signup = Joi.object({
	data: Joi.object({
		username: Joi.string().pattern(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required()
	}).required()
}).required()