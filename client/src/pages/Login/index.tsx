import { FC } from 'react';
import { AuthPageLayout } from '@components';
import { APP_ROUTES } from '@routes';
import { LoginPageForm } from './Form';

export const LoginPage: FC = () => (
  <AuthPageLayout
    title="Войти в личный кабинет"
    linkTo={APP_ROUTES.REGISTRATION}
    linkText="Регистрация"
    linkCaption="Ещё нет аккаунта?"
  >
    <LoginPageForm/>
  </AuthPageLayout>
);