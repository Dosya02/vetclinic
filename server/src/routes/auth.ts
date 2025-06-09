import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
  getCurrentUser,
  login,
  register,
  resetPassword,
  sendPasswordResetCode,
  sendVerificationCode,
  verifyEmailCode,
  verifyPasswordResetCode,
} from 'controllers/auth'
import { authMiddleware } from 'middlewares/auth'

const authRouter = Router()

authRouter.get(API_PATHS.AUTH_ROUTES.ME, authMiddleware, getCurrentUser)
authRouter.post(API_PATHS.AUTH_ROUTES.LOGIN, login)
authRouter.post(API_PATHS.AUTH_ROUTES.REGISTER, register)
authRouter.post(API_PATHS.AUTH_ROUTES.RESET_PASSWORD, resetPassword)
authRouter.post(
  API_PATHS.AUTH_ROUTES.SEND_VERIFICATION_CODE,
  sendVerificationCode,
)
authRouter.post(
  API_PATHS.AUTH_ROUTES.SEND_PASSWORD_RESET_CODE,
  sendPasswordResetCode,
)
authRouter.post(API_PATHS.AUTH_ROUTES.VERIFY_EMAIL_CODE, verifyEmailCode)
authRouter.post(
  API_PATHS.AUTH_ROUTES.VERIFY_PASSWORD_RESET_CODE,
  verifyPasswordResetCode,
)

export { authRouter }
