import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { cloudinary } from 'config/cloudinary'
import { Pet } from 'models/pet'

export const updatePet = asyncHandler(async (
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

	const {
		name,
		speciesId,
		breedId,
		ownerId,
		birthdate,
		gender,
		features,
	} = req.body

	if (name !== undefined) pet.name = name
	if (speciesId !== undefined) pet.speciesId = speciesId
	if (breedId !== undefined) pet.breedId = breedId
	if (ownerId !== undefined) pet.ownerId = ownerId
	if (birthdate !== undefined) pet.birthdate = new Date(birthdate)
	if (gender !== undefined) pet.gender = gender
	if (features !== undefined) pet.features = features

	if (req.files && 'image' in req.files) {
		const file = Array.isArray(req.files.image) ? req.files.image[0] : req.files.image

		if (pet.imagePublicId) {
			await cloudinary.uploader.destroy(pet.imagePublicId)
		}

		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			folder: 'pets',
		})

		pet.imageUrl = result.secure_url
		pet.imagePublicId = result.public_id
	}

	await pet.save()

	res.json({
		message: 'Питомец успешно обновлён.',
		pet,
	})
})