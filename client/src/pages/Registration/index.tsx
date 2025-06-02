import { FC } from 'react';
import { AuthPageLayout } from '@components';
import { APP_ROUTES } from '@routes';
import { RegistrationPageForm } from './Form';

export const RegistrationPage: FC = () => (
  <AuthPageLayout
    title="Регистрация"
    linkTo={APP_ROUTES.LOGIN}
    linkText="Войти"
    linkCaption="Уже есть аккаунт?"
  >
    <RegistrationPageForm/>
  </AuthPageLayout>
);