import { Router } from "express";
import * as UserController from "./user.controller.js";

const router = Router();

router.post('/signup', UserController.signup);


export default router;