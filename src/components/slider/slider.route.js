import { Router } from "express";
import * as SliderController from "./slider.controller.js";

const router = Router();

router.post('/create', SliderController.create);
router.get('/find/:id', SliderController.findOne);
router.post('/find/all', SliderController.findAll);
router.post('/update', SliderController.updateOne);
router.post('/delete', SliderController.deleteOne);
router.post('/count', SliderController.sliderCount);

export default router;