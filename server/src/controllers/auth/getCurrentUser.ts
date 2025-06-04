import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthRequest } from 'types/authRequest';

export const getCurrentUser = asyncHandler(async (
  req: AuthRequest,
  res: Response,
) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Не авторизован');
  }

  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      verified: req.user.verified,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      imageUrl: req.user.imageUrl,
      birthDate: req.user.birthDate,
    },
  });
});
