import { FC } from 'react';
import { AuthPageLayout } from '@components';
import { APP_ROUTES } from '@routes';

export const LoginPage: FC = () => (
  <AuthPageLayout
    title="Войти в личный кабинет"
    linkTo={APP_ROUTES.REGISTRATION}
    linkText="Регистрация"
    linkCaption="Ещё нет аккаунта?"
  >
    Hello world!
  </AuthPageLayout>
);