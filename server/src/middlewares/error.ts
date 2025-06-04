import { Response } from 'express';

export function errorHandler(
  err: Error,
  res: Response,
) {
  const statusCode = res.statusCode && res.statusCode !== 200
                     ? res.statusCode
                     : 500;

  res.status(statusCode).json({
    message: err.message,
  });
}
