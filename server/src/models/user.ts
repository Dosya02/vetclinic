import { Document, InferSchemaType, model, Schema } from "mongoose";

export interface IUser extends Document {
	email: string;
	verificationCode?: string;
	verificationCodeExpires?: Date;
	password: string;
	isVerified: boolean;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	email: { type: String, required: true, unique: true },
	verificationCode: { type: String },
	verificationCodeExpires: { type: Date, required: false },
	password: { type: String },
	isVerified: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("Users", userSchema);