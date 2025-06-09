import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Service } from 'models/service'

export const updateService = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const { name } = req.body

  const service = await Service.findById(id)
  if (!service) {
    res.status(404)
    throw new Error('Услуга не найдена.')
  }

  if (name) {
    service.name = name
  }
  await service.save()

  res.json({
    message: 'Услуга успешно обновлена.',
    service,
  })
})