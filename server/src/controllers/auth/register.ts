import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from 'models/user';
import { VerificationCode } from 'models/verificationCode';
import { generateJwtToken } from 'utils/generateJwtToken';
import { hashPassword } from 'utils/hashPassword';
import { VERIFICATION_PURPOSES } from 'constants/verification';

export const register = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email и пароль обязательны');
  }

  const codeStillExists = await VerificationCode.exists({
    email,
    purpose: VERIFICATION_PURPOSES.EMAIL_VERIFICATION,
  });

  if (codeStillExists) {
    res.status(400);
    throw new Error('Код подтверждения не подтверждён или истёк');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error('Пользователь с таким email уже существует');
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    agree: true,
    verified: true,
  });

  const token = generateJwtToken({ userId: user._id.toString() });

  res.status(201).json({
    message: 'Регистрация прошла успешно',
    token,
  });
});
