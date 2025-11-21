import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
Joi.objectId = JoiObjectId(Joi)

export const create = Joi.object({
    data: Joi.object({
        username : Joi.string().required(),
        email: Joi.string().required(),
        fullName: Joi.string().required(),
        country: Joi.string().required(),
        gameName: Joi.string().required()
    }).required()
}).required();