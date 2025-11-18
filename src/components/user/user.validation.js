import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
Joi.objectId = JoiObjectId(Joi)

export const signup = Joi.object({
	data: Joi.object({
		username: Joi.string().pattern(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required()
	}).required()
}).required();

export const login = Joi.object({
	criteria: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}).required()
}).required();

export const sendPasswordVerification = Joi.object({
	data: Joi.object({
		email: Joi.string().required(),
	}).required()
}).required();

export const resetPassword = Joi.object({
	data: Joi.object({
		password: Joi.string().required()
	}).required()
}).required();