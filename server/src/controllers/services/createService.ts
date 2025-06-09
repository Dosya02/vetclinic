import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Service } from 'models/service'

export const createService = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { name } = req.body

  if (!name) {
    res.status(400)
    throw new Error('Название обязательно')
  }

  const existing = await Service.findOne({ name })
  if (existing) {
    res.status(409)
    throw new Error('Такая услуга уже существует.')
  }

  const newService = await Service.create({ name })

  res.status(201).json({
    message: 'Услуга успешно создана.',
    service: newService,
  })
})