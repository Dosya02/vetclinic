import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User } from 'models/user'

export const getAllUsers = asyncHandler(async (
	_req: Request,
	res: Response,
) => {
	const users = await User.find().select('-password')

	res.status(200).json({
		message: 'Список всех пользователей.',
		users,
	})
})
