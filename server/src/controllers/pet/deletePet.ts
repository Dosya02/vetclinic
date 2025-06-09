import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { cloudinary } from 'config/cloudinary'
import { Pet } from 'models/pet'

export const deletePet = asyncHandler(async (
	req: Request,
	res: Response,
) => {
	const { id } = req.params

	if (!mongoose.isValidObjectId(id)) {
		res.status(400)
		throw new Error('Неверный формат ID.')
	}

	const pet = await Pet.findById(id)
	if (!pet) {
		res.status(404)
		throw new Error('Питомец не найден.')
	}

	if (pet.imagePublicId) {
		await cloudinary.uploader.destroy(pet.imagePublicId)
	}

	await pet.deleteOne()

	res.json({
		message: 'Питомец успешно удалён.',
	})
})