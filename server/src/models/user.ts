import { Document, model, Schema, Types } from 'mongoose';
import { USER_ROLES, UserRole } from 'constants/roles';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role: UserRole;
  verified: boolean;
  agree: boolean;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  birthDate?: {
    day: number;
    month: number;
    year: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CLIENT,
      required: true,
    },
    verified: { type: Boolean, required: true, default: false },
    agree: { type: Boolean, required: true },

    firstName: { type: String },
    lastName: { type: String },
    imageUrl: { type: String },
    birthDate: {
      day: { type: Number },
      month: { type: Number },
      year: { type: Number },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
