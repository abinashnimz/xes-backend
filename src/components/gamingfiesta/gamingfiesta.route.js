import { Router } from "express";
import * as GamingFiestaController from "./gamingfiesta.controller.js";

const router = Router();

router.post('/create', GamingFiestaController.create);

export default router;