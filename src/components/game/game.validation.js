import Joi from 'joi'
import JoiObjectId from 'joi-objectid'
Joi.objectId = JoiObjectId(Joi)

export const create = Joi.object({
	data: Joi.object({
		name: Joi.string().required(),
		shortName: Joi.string().required(),
		isIdRequired: Joi.boolean().required(),
		gameIdTag: Joi.alternatives().conditional('isIdRequired', { is: true, then: Joi.string().required(), otherwise: Joi.string() }),
		isIgnRequired: Joi.boolean().required(),
		gameIgnTag: Joi.alternatives().conditional('isIgnRequired', { is: true, then: Joi.string().required(), otherwise: Joi.string() }),
		allowedModes: Joi.array().items(Joi.string().valid('duelTeam', 'duelSolo', 'battleRoyaleSolo', 'battleRoyaleTeam').required()).required(),
		isTeamCreationAllowed: Joi.boolean().required(),
		maxTeamMemberCount: Joi.alternatives().conditional('isTeamCreationAllowed', { is: true, then: Joi.number().required(), otherwise: Joi.number() }),
		thumbnail: Joi.string().required(),
		backgroundImage: Joi.string()
	}).required()
}).required()