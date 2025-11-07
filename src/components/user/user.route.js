import { Router } from "express";
import * as UserController from "./user.controller.js";
import {verifyEmailVerificationToken} from "../../services/auth.service.js";

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/verify/email', verifyEmailVerificationToken, UserController.verifyEmail)



export default router;