import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { VERIFICATION_PURPOSES } from 'constants/verification';
import { User } from 'models/user';
import { VerificationCode } from 'models/verificationCode';
import { hashPassword } from 'utils/hashPassword';
import { generateJwtToken } from 'utils/generateJwtToken';

export const resetPassword = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400);
    throw new Error('Email и новый пароль обязательны');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  // Удаляем код после использования
  await VerificationCode.deleteMany({
    email,
    purpose: VERIFICATION_PURPOSES.RESET_PASSWORD,
  });

  const token = generateJwtToken({ userId: user._id.toString() });

  res.status(200).json({ message: 'Пароль успешно обновлён', token });
});
