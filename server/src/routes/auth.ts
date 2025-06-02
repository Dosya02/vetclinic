import { Router } from 'express';
import { API_PATHS } from 'constants/paths';
import { login } from 'controllers/auth/login';
import { sendCode } from 'controllers/auth/sendCode';
import { verifyCode } from 'controllers/auth/verifyCode';
import { register } from 'controllers/auth/register';

const authRouter = Router();

authRouter.post(API_PATHS.AUTH_ROUTES.LOGIN, login);
authRouter.post(API_PATHS.AUTH_ROUTES.SEND_CODE, sendCode);
authRouter.post(API_PATHS.AUTH_ROUTES.VERIFY_CODE, verifyCode);
authRouter.post(API_PATHS.AUTH_ROUTES.REGISTER, register);

export { authRouter };
