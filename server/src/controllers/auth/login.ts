import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User } from 'models/user';
import { generateJwtToken } from 'utils/generateJwtToken';

export const login = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body;

  // 1. Проверка данных
  if (!email || !password) {
    res.status(400);
    throw new Error('Email и пароль обязательны');
  }

  // 2. Поиск пользователя
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Неверные учетные данные');
  }

  // 3. Проверка пароля
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401);
    throw new Error('Неверные учетные данные');
  }

  // 4. Проверка верификации
  if (!user.verified) {
    res.status(403);
    throw new Error('Email не подтверждён');
  }

  // 5. Генерация токена
  const token = generateJwtToken({ userId: user._id.toString() });

  // 6. Ответ
  res.status(200).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    },
  });
});
