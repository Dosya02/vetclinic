import express from "express";
import { registerUser, verifyCode, setPassword, loginUser } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { AuthenticatedRequest } from "../types/express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-code", verifyCode);
router.post("/set-password", setPassword);
router.post("/login", loginUser);

router.get("/me", authenticateToken, (req: AuthenticatedRequest, res) => {
	res.status(200).json({ message: "Token is valid!", user: req.user });
});

export default router;