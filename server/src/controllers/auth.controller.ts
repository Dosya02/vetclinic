import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import env from "../utils/validateEnv";
import { sendEmail } from "../utils/email";

export const registerUser = async (req: Request, res: Response) => {
	const { email } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400).json({ message: "User with this email already exists." });
		console.log("User with this email already exists.");
		return;
	}

	const verificationCode = crypto.randomInt(100000, 999999).toString();

	try {
		await User.findOneAndUpdate(
			{ email },
			{
				verificationCode,
				verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000),
				isVerified: false,
			},
			{ new: true, upsert: true }
		);

		const mailOptions = {
			to: email,
			subject: "Your verification code",
			text: `Your verification code is: ${verificationCode}`,
		};

		await sendEmail(mailOptions);

		res.status(200).json({ message: "Verification code sent to email." });
		console.log("Verification code sent to email!");
	} catch (error) {
		console.error("Email sending error: ", error);
		res.status(500).json({ message: "Error sending email." });
	}
}

export const verifyCode = async (req: Request, res: Response) => {
	const { email, verificationCode } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "User not found." });
			console.log("User not found in verify code.")
			return;
		}

		console.log("Verification code expires at: ", user.verificationCodeExpires);
		console.log("Current time: ", new Date());

		if (
			user.verificationCode !== verificationCode ||
			!user.verificationCodeExpires ||
			user.verificationCodeExpires.getTime() < Date.now()
		) {
			res.status(400).json({ message: "Invalid or expired code." });
			console.log("Invalid or expired code in verify code.")
			return;
		}

		user.isVerified = true;
		user.verificationCode = undefined;
		user.verificationCodeExpires = undefined;
		await user.save();

		res.status(200).json({ message: "Code verified successfully." });
		console.log("Code verified successfully in verify code.")
	} catch (error) {
		console.error("Error verifying code: ", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

export const setPassword = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		if (!user.isVerified) {
			res.status(403).json({ message: "Email not verified." });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;

		await user.save();

		// Генерация JWT-токена
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		res.status(200).json({
			message: "Password set successfully.",
			token,
		});
	} catch (error) {
		console.error("Error setting password: ", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "User not found." });
			return;
		}

		if (!user.isVerified) {
			res.status(403).json({ message: "Email not verified." });
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			res.status(401).json({ message: "Invalid password." });
			return;
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		res.status(200).json({
			message: "Login successful.",
			token,
		});
	} catch (error) {
		console.error("Error logging in: ", error);
		res.status(500).json({ message: "Internal server error." });
	}
};