import { Router } from 'express';
import { API_PATHS } from 'constants/paths';
import { login } from 'controllers/auth/login';
import { register } from 'controllers/auth/register';
import { getCurrentUser } from 'controllers/auth/getCurrentUser';
import { resetPassword } from 'controllers/auth/resetPassword';
import { sendVerificationCode } from 'controllers/auth/sendVerificationCode';
import { sendPasswordResetCode } from 'controllers/auth/sendPasswordResetCode';
import { verifyEmailCode } from 'controllers/auth/verifyEmailCode';
import { verifyPasswordResetCode } from 'controllers/auth/verifyPasswordResetCode';
import { authMiddleware } from 'middlewares/auth';

const authRouter = Router();

authRouter.get(API_PATHS.AUTH_ROUTES.ME, authMiddleware, getCurrentUser);
authRouter.post(API_PATHS.AUTH_ROUTES.LOGIN, login);
authRouter.post(API_PATHS.AUTH_ROUTES.REGISTER, register);
authRouter.post(API_PATHS.AUTH_ROUTES.RESET_PASSWORD, resetPassword);
authRouter.post(API_PATHS.AUTH_ROUTES.SEND_VERIFICATION_CODE, sendVerificationCode);
authRouter.post(API_PATHS.AUTH_ROUTES.SEND_PASSWORD_RESET_CODE, sendPasswordResetCode);
authRouter.post(API_PATHS.AUTH_ROUTES.VERIFY_EMAIL_CODE, verifyEmailCode);
authRouter.post(API_PATHS.AUTH_ROUTES.VERIFY_PASSWORD_RESET_CODE, verifyPasswordResetCode);

export { authRouter };
