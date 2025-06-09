import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Species } from 'models/species'

export const updateSpecies = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const { name } = req.body

  const species = await Species.findById(id)
  if (!species) {
    res.status(404)
    throw new Error('Вид питомца не найден.')
  }

  if (name) {
    species.name = name
  }
  await species.save()

  res.json({
    message: 'Вид питомца успешно обновлён.',
    species,
  })
})