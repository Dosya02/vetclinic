import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { VERIFICATION_PURPOSES } from 'constants/verification';
import { User } from 'models/user';
import { VerificationCode } from 'models/verificationCode';
import { sendEmail } from 'utils/email';
import { generateSixDigitCode } from 'utils/generateSixDigitCode';

export const sendPasswordResetCode = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error('Email обязателен');
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('Пользователь с такой почтой не найден');
  }

  await VerificationCode.deleteMany({
    email,
    purpose: VERIFICATION_PURPOSES.RESET_PASSWORD,
  });

  const code = generateSixDigitCode();

  await VerificationCode.create({
    email,
    code,
    purpose: VERIFICATION_PURPOSES.RESET_PASSWORD,
  });

  await sendEmail({
    to: email,
    subject: 'Код сброса пароля',
    html: `<p>Ваш код для сброса пароля: <strong>${code}</strong></p>`,
  });

  res.status(200).json({
    message: 'Код для сброса пароля отправлен на почту',
  });
});
