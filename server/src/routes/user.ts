import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
	createVet,
	getAllUsers,
} from 'controllers/user'

const userRouter = Router()

userRouter.get(API_PATHS.USER_ROUTES.GET_ALL, getAllUsers)
userRouter.post(API_PATHS.USER_ROUTES.VETS, createVet)

export { userRouter }