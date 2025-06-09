import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Breed } from 'models/breed'

export const getAllBreeds = asyncHandler(async (
  _req: Request,
  res: Response,
) => {
  const breeds = await Breed.find().sort({ name: 1 })

  res.json({
    message: 'Список пород успешно получен.',
    breeds,
  })
})
