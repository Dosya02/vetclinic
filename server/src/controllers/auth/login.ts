import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from 'models/user'
import { generateJwtToken } from 'utils/generateJwtToken'

export const login = asyncHandler(async (
  req: Request,
  res: Response,
) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email и пароль обязательны')
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(401)
    throw new Error('Неверные учетные данные')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    res.status(401)
    throw new Error('Неверные учетные данные')
  }

  const token = generateJwtToken({ userId: user._id.toString() })

  res.status(200).json({
    message: 'Вы успешно авторизованы',
    token,
  })
})
