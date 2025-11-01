import { Router } from "express";
import * as GameController from "./game.controller.js";

const router = Router();

router.post('/create', GameController.create);
// router.get('/find/:id', GameController.findOne);
// router.post('/find/all', GameController.findAll);
// router.post('/update', GameController.updateOne);
// router.post('/delete', GameController.deleteOne);
// router.post('/count', GameController.gameCount);

export default router;