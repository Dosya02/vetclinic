import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Service } from 'models/service'

export const deleteService = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params

  const service = await Service.findById(id)
  if (!service) {
    res.status(404)
    throw new Error('Услуга не найдена.')
  }

  await service.deleteOne()

  res.json({
    message: 'Услуга успешно удалена.',
  })
})