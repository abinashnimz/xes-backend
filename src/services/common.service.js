import constant from '../constant.js';
import * as JoiAbstract from './joi.abstract.js';
import customMongooseAbstract from './mongoose.abstract.js';


export const CountDocuments =  DOCUMENT => async (req, res) => {
	try {
		const mongooseAbstract = customMongooseAbstract(DOCUMENT)
		const { criteria } = await JoiAbstract.CountDocuments.validateAsync(req.body)
		const count = await mongooseAbstract.countDocuments(criteria)
		return res.json({ count })
	} catch (error) {
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}


export const DeleteOne = DOCUMENT =>  async (req, res) => {
	try {
		console.log(process.env.BACKEND_URL);
		if (process.env.BACKEND_URL !== 'https://api.xesports.pro') {
			const mongooseAbstract = customMongooseAbstract(DOCUMENT)
			const { criteria: { _id } } = await JoiAbstract.DeleteDocument.validateAsync(req.body)
			await mongooseAbstract.deleteOne(_id)
		}
		return res.sendStatus(constant.RESPONSE.OK.STATUS)
	} catch (error) {
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}