import { Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { AuthRequest } from 'types/authRequest'
import { env } from 'config/env'
import { User } from 'models/user'

export const authMiddleware = asyncHandler(async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization

	if (!authHeader?.startsWith('Bearer ')) {
		res.status(401)
		throw new Error('Не авторизован — токен отсутствует')
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string }

		const user = await User.findById(decoded.userId).select('-password')

		if (!user) {
			res.status(401)
			throw new Error('Пользователь не найден')
		}

		req.user = user
		next()
	} catch (err) {
		res.status(401)
		throw new Error('Неверный токен')
	}
})
