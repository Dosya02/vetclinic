import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import { AuthenticatedRequest, JwtPayload } from "../types/express";

export const authenticateToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Authorization header missing or malformed." });
		return;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
		req.user = decoded;
		next();
	} catch (error) {
		console.error(error);
		res.status(403).json({ message: "Invalid or expired token." });
		return;
	}
};