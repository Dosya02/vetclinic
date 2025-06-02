import { Document, model, Schema } from 'mongoose';

export interface IVerificationCode extends Document {
  email: string;
  code: string;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export const VerificationCode = model<IVerificationCode>(
  'VerificationCode',
  verificationCodeSchema,
);
