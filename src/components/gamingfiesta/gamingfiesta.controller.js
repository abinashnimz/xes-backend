import constant from '../../constant.js';
import GamingFiesta from './gamingfiesta.model.js';
import * as GamingFiestaValidation from "./gamingfiesta.validation.js";

import customMongooseAbstract from "../../services/mongoose.abstract.js";

import fp from '../../services/fp.service.js';
const { pick } = fp;



const mongooseAbstract = customMongooseAbstract(GamingFiesta);

export const create = async (req, res) => {
	try {
        const validatedData = await GamingFiestaValidation.create.validateAsync(req.body);
		const { data } = validatedData;
		const createdUser = await mongooseAbstract.create(data).then(user => user.toObject());
        if(!createdUser){
            res.status(constant.RESPONSE.ERROR.STATUS);
        }
        if(createdUser){
            res.status(constant.RESPONSE.OK.STATUS).json({ message : 'Tournament Joined Successfully.' });
        }
	} catch (error) {
        console.log(error);
		if(error) res.status(400).send(error);
		if (constant.APP_DEBUG) res.status(constant.RESPONSE.BAD_REQUEST.STATUS).json(error)
		else res.sendStatus(constant.RESPONSE.ERROR.STATUS)
	}
}