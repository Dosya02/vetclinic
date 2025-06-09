import { Response } from 'express'

export function handleDuplicateKeyError(
  res: Response,
  error: any,
  message: string = 'Дубликат данных. Запись с такими значениями уже существует.',
): void {
  if (error.code === 11000) {
    res.status(409)
    throw new Error(message)
  }
  throw error
}