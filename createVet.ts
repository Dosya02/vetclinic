import { Response } from 'express'
import asyncHandler from 'express-async-handler'
import { cloudinary } from 'config/cloudinary'
import { User } from 'models/user'
import { hashPassword } from 'utils/hashPassword'
import { USER_ROLES } from 'constants/roles'
import { AuthRequest } from 'types/authRequest'

export const createVet = asyncHandler(async (
	req: AuthRequest,
	res: Response,
) => {
	const {
		email,
		password,
		firstName,
		lastName,
		positions,
	} = req.body

	if (!email || !password || !firstName || !lastName) {
		res.status(400)
		throw new Error('Email, пароль, имя и фамилия обязательны.')
	}

	const existingUser = await User.findOne({ email })
	if (existingUser) {
		res.status(409)
		throw new Error('Пользователь с таким email уже существует.')
	}

	let imageUrl
	let imagePublicId

	if (req.files && 'image' in req.files) {
		const file = Array.isArray(req.files.image) ? req.files.image[0] : req.files.image

		try {
			const result = await cloudinary.uploader.upload(file.tempFilePath, {
				folder: 'vets',
			})

			imageUrl = result.secure_url
			imagePublicId = result.public_id
		} catch (error) {
			console.error('Cloudinary upload failed:', error)
			res.status(500)
			throw new Error('Ошибка загрузки изображения в Cloudinary.')
		}
	}

	let positionsArray: string[] | undefined = undefined

	if (positions) {
		if (typeof positions === 'string') {
			try {
				positionsArray = JSON.parse(positions)
			} catch {
				positionsArray = [positions]
			}
		} else if (Array.isArray(positions)) {
			if (positions.length === 1 && typeof positions[0] === 'string') {
				try {
					positionsArray = JSON.parse(positions[0])
				} catch {
					positionsArray = positions
				}
			} else {
				positionsArray = positions
			}
		} else {
			positionsArray = []
		}
	}

	const hashedPassword = await hashPassword(password)

	const vetUser = await User.create({
		email,
		password: hashedPassword,
		firstName,
		lastName,
		imageUrl,
		imagePublicId,
		role: USER_ROLES.VET,
		agree: true,
		verified: true,
		positions: positionsArray,
	})

	res.status(201).json({
		message: 'Ветеринар успешно зарегистрирован.',
		user: {
			id: vetUser._id,
			email: vetUser.email,
			firstName: vetUser.firstName,
			lastName: vetUser.lastName,
			imageUrl: vetUser.imageUrl,
			role: vetUser.role,
			positions: vetUser.positions,
		},
	})
})
