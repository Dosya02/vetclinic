import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";
import env from "../utils/validateEnv";
import { sendEmail } from "../utils/email";
import { AuthenticatedRequest } from "../middlewares";

export const sendVerificationCode = async (req: Request, res: Response) => {
	const { email } = req.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400).json({ message: "Пользователь с такой почтой уже существует." });
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
			subject: "Код для верификации на сайта ВетКлиники",
			text: `Ваш код для верификации ${verificationCode}`,
		};

		await sendEmail(mailOptions);

		res.status(200).json({ message: "Verification code sent to email." });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export const verifyCode = async (req: Request, res: Response) => {
	const { email, verificationCode } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "Пользователь не найден." });
			return;
		}

		if (
			user.verificationCode !== verificationCode ||
			!user.verificationCodeExpires ||
			user.verificationCodeExpires.getTime() < Date.now()
		) {
			res.status(400).json({ message: "Недействительный код." });
			return;
		}

		user.isVerified = true;
		user.verificationCode = undefined;
		user.verificationCodeExpires = undefined;
		await user.save();

		res.status(200).json({ message: "Код успешно подтвержден." });
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export const setPassword = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "Пользователь не найден." });
			return;
		}

		if (!user.isVerified) {
			res.status(403).json({ message: "Электронная почта не подтверждена." });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;

		await user.save();

		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		const { firstName, lastName, birthDate, avatar } = user;

		res.status(200).json({
			message: "Пароль успешно установлен.",
			token,
			userInfo: { email, firstName, lastName, birthDate, avatar },
		});
	} catch (error) {
		res.status(500).json({ message: error });
	}
}

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({ message: "Пользователь не найден." });
			return;
		}

		if (!user.isVerified) {
			res.status(403).json({ message: "Электронная почта не подтверждена." });
			return;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password!);

		if (!isPasswordValid) {
			res.status(401).json({ message: "Неправильный пароль." });
			return;
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			env.JWT_SECRET,
			{ expiresIn: "7d" }
		);

		const { firstName, lastName, birthDate, avatar } = user;

		res.status(200).json({
			message: "Успешная авторизация.",
			token,
			userInfo: { email, firstName, lastName, birthDate, avatar },
		});
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const user = await User.findById(req.userId).select("-password -verificationCode -verificationCodeExpires");

		if (!user) {
			res.status(404).json({ message: "Пользователь не найден." });
			return;
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}