import constant from "../../constant.js";
import Slider from "./slider.model.js";
import customMongooseAbstract from "../../services/mongoose.abstract.js";
import * as SliderValidation from "./slider.validation.js";
import * as CommonService from "../../services/common.service.js";

const mongooseAbstract = customMongooseAbstract(Slider);

export const create = async (req, res) => {
    try{
        const { data } = await SliderValidation.create.validateAsync(req.body);
        data['createdBy'] = req?.user?._id;
        const slider = await mongooseAbstract.create(data);
        console.log(slider);
        return res.status(201).json(slider.toObject());
    } catch (error){
        console.log(error);
        if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error);
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS);
    }
}

export const findOne = async (req, res) => {
    try {
		const criteria = {
			_id: req.params.id
		}
		const slider = await mongooseAbstract.findOne(criteria, '-createdAt -updatedAt')
		return res.json(slider)
	} catch (error) {
        console.log(error);
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const findAll = async (req, res) => {
	try {
		const { criteria, project, sort, skip, limit } = req.body;
		const slider = await mongooseAbstract.findAll(criteria, project, sort, skip, limit);
		return res.json(slider);
	} catch (error) {
        console.log(error);
		if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}

export const updateOne = async (req, res) => {
    try{
        const validatedData = await SliderValidation.updateOne.validateAsync(req.body);
		const { criteria, data } = validatedData;
		data['updatedBy'] = req?.user?._id;
		const slider = await mongooseAbstract.updateOne(criteria._id, data);
        console.log(slider);
		return res.json(slider);
    } catch (error){
        console.log(error);
        if (constant.APP_DEBUG) return res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error);
		return res.sendStatus(constant.RESPONSE.ERROR.STATUS);
    }
}

export const deleteOne = CommonService.DeleteOne(Slider)
export const sliderCount = CommonService.CountDocuments(Slider)