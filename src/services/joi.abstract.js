import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

export const DeleteDocument = Joi.object({
	criteria: Joi.object({
		_id: Joi.objectId()
	}).required(),
}).required();


export const CountDocuments = Joi.object({
	criteria: Joi.object().required(),
}).required();