import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Service } from 'models/service'

export const getAllServices = asyncHandler(async (
  _req: Request,
  res: Response,
) => {
  const services = await Service.find().sort({ name: 1 })

  res.json({
    message: 'Список услуг успешно получен.',
    services,
  })
})