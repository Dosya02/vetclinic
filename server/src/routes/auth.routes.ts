import express from "express";
import {
	sendVerificationCode,
	verifyCode,
	setPassword,
	loginUser,
	getUserProfile
} from "../controllers/auth.controller";
import { validateToken } from "../middlewares";

const router = express.Router();

router.post("/registration/send-code", sendVerificationCode);
router.post("/registration/verify-code", verifyCode);
router.post("/registration/set-password", setPassword);
router.post("/login", loginUser);

router.get("/profile", validateToken, getUserProfile);

export default router;