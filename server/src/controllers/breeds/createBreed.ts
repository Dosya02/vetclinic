import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Breed } from 'models/breed'
import { handleDuplicateKeyError } from 'utils/handleDuplicateKeyError'

export const createBreed = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { name, speciesId } = req.body

  if (!name || !speciesId) {
    res.status(400)
    throw new Error('Название и ID вида обязательны.')
  }

  try {
    const newBreed = await Breed.create({ name, speciesId })
    res.status(201).json({
      message: 'Порода успешно создана.',
      breed: newBreed,
    })
  } catch (error: any) {
    handleDuplicateKeyError(
      res,
      error,
      'Такая порода уже существует для указанного вида.',
    )
  }
})