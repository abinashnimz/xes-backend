import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

export const create = Joi.object({
    data: Joi.object({
        name: Joi.string().required(),
        imageDesktop: Joi.string().required(),
        imageMobile: Joi.string().required(),
        isDraft: Joi.boolean(),
        redirectionLink: Joi.string()
    }).required()
}).required();

export const updateOne = Joi.object({
    criteria: Joi.object({
        _id : Joi.objectId().required()
    }).required(),
    data : Joi.object({
        name: Joi.string(),
        imageDesktop: Joi.string(),
        imageMobile: Joi.string(),
        isDraft: Joi.boolean(),
        redirectionLink: Joi.string()
    }).required()
}).required();