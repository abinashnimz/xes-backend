import { Router } from "express";
import * as UserController from "./user.controller.js";
import {verifyEmailVerificationToken, verifyJwtPasswordRecoveryToken} from "../../services/auth.service.js";

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/verify/email', verifyEmailVerificationToken, UserController.verifyEmail);
router.post('/sendpasswordresetmail', UserController.sendPasswordVerification);
router.post('/reset/password', verifyJwtPasswordRecoveryToken, UserController.resetPassword);



export default router;