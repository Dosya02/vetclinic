import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { cloudinary } from 'config/cloudinary'
import { Pet } from 'models/pet'
import { AuthRequest } from 'types/authRequest'
import { User } from 'models/user'

export const createPet = asyncHandler(async (
	req: AuthRequest,
	res: Response,
) => {
	const {
		name,
		speciesId,
		breedId,
		ownerId,
		birthdate,
		gender,
		features,
	} = req.body

	if (!name || !speciesId || !breedId || !ownerId || !birthdate || !gender) {
		res.status(400)
		throw new Error('Обязательные поля отсутствуют.')
	}

	const birthdateDate = new Date(birthdate)
	if (isNaN(birthdateDate.getTime())) {
		res.status(400)
		throw new Error('Неверный формат даты рождения.')
	}

	let featuresArray: string[] | undefined = undefined

	if (features) {
		if (typeof features === 'string') {
			try {
				featuresArray = JSON.parse(features)
			} catch {
				featuresArray = [features]
			}
		} else if (Array.isArray(features)) {
			if (features.length === 1 && typeof features[0] === 'string') {
				try {
					featuresArray = JSON.parse(features[0])
				} catch {
					featuresArray = features
				}
			} else {
				featuresArray = features
			}
		} else {
			featuresArray = []
		}
	}

	let imageUrl
	let imagePublicId

	if (req.files && 'image' in req.files) {
		const file = Array.isArray(req.files.image) ? req.files.image[0] : req.files.image

		console.log('Uploading file:', file.tempFilePath)

		try {
			const result = await cloudinary.uploader.upload(file.tempFilePath, {
				folder: 'pets',
			})

			imageUrl = result.secure_url
			imagePublicId = result.public_id
		} catch (error) {
			console.error('Cloudinary upload failed:', error)
			res.status(500)
			throw new Error('Ошибка загрузки изображения в Cloudinary.')
		}
	}

	const newPet = await Pet.create({
		name,
		speciesId,
		breedId,
		ownerId,
		birthdate: birthdateDate,
		gender,
		features: featuresArray,
		imageUrl,
		imagePublicId,
	})

	await User.findByIdAndUpdate(ownerId, {
		$addToSet: { pets: newPet._id },
	})

	res.status(201).json({
		message: 'Питомец успешно добавлен.',
		pet: newPet,
	})
})