import nodemailer from "nodemailer";
import env from "./validateEnv";

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS,
	},
});

interface MailOptions {
	to: string;
	subject: string;
	text: string;
}

export const sendEmail = async (options: MailOptions) => {
	await transporter.sendMail({
		from: env.EMAIL_USER,
		to: options.to,
		subject: options.subject,
		text: options.text,
	});
};