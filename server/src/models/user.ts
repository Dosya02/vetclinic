import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
	email: string
	verificationCode?: string
	verificationCodeExpires?: Date
	password?: string
	isVerified: boolean
	createdAt: Date
	firstName?: string
	lastName?: string
	birthDate?: Date
	avatar?: string
}

const userSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	verificationCode: { type: String },
	verificationCodeExpires: { type: Date },
	password: { type: String },
	isVerified: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	birthDate: { type: Date, required: false },
	avatar: { type: String, required: false },
});

export default model<IUser>("Users", userSchema);