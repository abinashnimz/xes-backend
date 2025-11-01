import constant from "../../constant.js";
import Game from "./game.model.js";
import customMongooseAbstract from "../../services/mongoose.abstract.js";
import * as GameValidation from "./game.validation.js";
import * as CommonService from "../../services/common.service.js";


const mongooseAbstract = customMongooseAbstract(Game);

export const create = async (req, res) => {
	try {
        console.log(req.body);
		const { data } = await GameValidation.create.validateAsync(req.body);
		const isGameAlreadyCreated = !!await mongooseAbstract.findOne({ shortName: data.shortName }, 'shortName');
        console.log(isGameAlreadyCreated);
		if (isGameAlreadyCreated) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json('Game already exist with given names');
		data['createdBy'] = req?.user?._id;
		const game = await mongooseAbstract.create(data);
		return res.json(game.toObject());
	} catch (error) {
		console.log(error);
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const findOne = async (req, res) => {
	try {
		const criteria = {
			_id: req.params.id
		}
		const game = await mongooseAbstract.findOne(criteria, '-createdAt -updatedAt')
		return res.json(game)
	} catch (error) {
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const findAll = async (req, res) => {
	try {
		console.log(req.body);
		const { criteria, project, sort, skip, limit } = req.body
		const game = await mongooseAbstract.findAll(criteria, project, sort, skip, limit)
		return res.json(game)
	} catch (error) {
		console.log(error);
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const updateOne = async (req, res) => {
	try {
		const validatedData = await GameValidation.updateOne.validateAsync(req.body)
		const { criteria, data } = validatedData
		data['updatedBy'] = req?.user?._id
		const game = await mongooseAbstract.updateOne(criteria._id, data)
		return res.json(game)
	} catch (error) {
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const deleteOne = CommonService.DeleteOne(Game);
export const gameCount = CommonService.CountDocuments(Game);