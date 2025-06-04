import { Document, model, Schema } from 'mongoose';
import {
  VERIFICATION_PURPOSES,
  VerificationPurpose,
} from 'constants/verification';

export interface IVerificationCode extends Document {
  email: string;
  code: string;
  purpose: VerificationPurpose;
  createdAt: Date;
}

const verificationCodeSchema = new Schema<IVerificationCode>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  purpose: {
    type: String,
    enum: Object.values(VERIFICATION_PURPOSES),
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export const VerificationCode = model<IVerificationCode>(
  'VerificationCode',
  verificationCodeSchema,
);
