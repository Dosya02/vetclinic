import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { VERIFICATION_PURPOSES } from 'constants/verification';
import { VerificationCode } from 'models/verificationCode';

export const verifyPasswordResetCode = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, code } = req.body;

  if (!email || !code) {
    res.status(400);
    throw new Error('Email и код обязательны');
  }

  const record = await VerificationCode.findOne({
    email,
    code,
    purpose: VERIFICATION_PURPOSES.RESET_PASSWORD,
  });

  if (!record) {
    res.status(400);
    throw new Error('Неверный или просроченный код');
  }

  await VerificationCode.deleteOne({ _id: record._id });

  res.status(200).json({ message: 'Код подтверждён' });
});
