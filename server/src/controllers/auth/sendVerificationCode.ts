import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from 'models/user';
import { VerificationCode } from 'models/verificationCode';
import { generateSixDigitCode } from 'utils/generateSixDigitCode';
import { sendEmail } from 'utils/email';

export const sendCode = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email обязателен');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error('Пользователь с такой почтой уже существует');
  }

  // Удаляем старые коды для этого email (на всякий случай)
  await VerificationCode.deleteMany({ email });

  const code = generateSixDigitCode();

  await VerificationCode.create({ email, code });

  await sendEmail({
    to: email,
    subject: 'Ваш код подтверждения',
    html: `<p>Ваш код подтверждения: <strong>${code}</strong></p>`,
  });

  res.json({ message: 'Код отправлен на почту' });
});
