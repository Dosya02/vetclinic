import { cleanEnv, num, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  CLIENT_URL: str(),
  MONGO_URI: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  JWT_SECRET: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_USER: str(),
  SMTP_PASS: str(),
  EMAIL_FROM: str(),
});