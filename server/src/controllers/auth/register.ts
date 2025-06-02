import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User } from 'models/user';
import { VerificationCode } from 'models/verificationCode';
import { generateJwtToken } from 'utils/generateJwtToken';

export const register = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, password, agreed } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email и пароль обязательны');
  }

  if (agreed !== true) {
    res.status(400);
    throw new Error('Необходимо согласие с условиями');
  }

  // Проверяем, что код подтверждён (т.е. нет в базе VerificationCode)
  const codeStillExists = await VerificationCode.exists({ email });
  if (codeStillExists) {
    res.status(400);
    throw new Error('Код подтверждения не подтверждён или истёк');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error('Пользователь с таким email уже существует');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    agreed: true,
    verified: true,
  });

  const token = generateJwtToken({
    userId: user._id.toString(),
  });

  res.status(201).json({
    message: 'Регистрация прошла успешно',
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
  });
});
