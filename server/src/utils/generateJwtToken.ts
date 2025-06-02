import jwt from 'jsonwebtoken';
import { env } from 'config/env';

export interface JwtPayload {
  userId: string;
}

export function generateJwtToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    env.JWT_SECRET as string,
    { expiresIn: '7d' },
  );
}
