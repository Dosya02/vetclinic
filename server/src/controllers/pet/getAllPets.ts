import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Pet } from 'models/pet'

export const getAllPets = asyncHandler(async (
	_req: Request,
	res: Response
) => {
	const pets = await Pet.find().sort({ createdAt: -1 })

	res.json({
		message: 'Список питомцев успешно получен.',
		pets,
	})
})