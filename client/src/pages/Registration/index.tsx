import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageLayout, CodeModal, PasswordModal } from '@components';
import { AUTH_STEP } from '@constants';
import { useModal } from '@hooks';
import { APP_ROUTES } from '@routes';
import { useRegisterMutation, useVerifyEmailCodeMutation } from '@store/api';
import { useAppSelector } from '@store/hooks';
import { RegistrationPageForm } from './Form';

export const RegistrationPage: FC = () => {
  const navigate = useNavigate();

  const { email, step } = useAppSelector(state => state.authReducer);
  const codeModal = useModal(false);
  const passwordModal = useModal(false);

  const [verifyEmailCode, { isLoading: codeModalLoading }] = useVerifyEmailCodeMutation();
  const [register, { isLoading: passwordModalLoading }] = useRegisterMutation();

  const handleVerifyEmailCode = async ({ email, code }: {
    email: string;
    code: string
  }): Promise<{ message: string }> => {
    return await verifyEmailCode({ email, code }).unwrap();
  };

  const handleRegister = async ({ email, password }: {
    email: string;
    password: string
  }): Promise<{ message: string; token: string; }> => {
    return await register({ email, password }).unwrap();
  };

  useEffect(() => {
    switch (step) {
      case AUTH_STEP.IDLE:
        codeModal.close();
        passwordModal.close();
        break;
      case AUTH_STEP.CODE:
        codeModal.open();
        passwordModal.close();
        break;
      case AUTH_STEP.PASSWORD:
        codeModal.close();
        passwordModal.open();
        break;
      case AUTH_STEP.DONE:
        codeModal.close();
        passwordModal.close();
        navigate(APP_ROUTES.HOME);
        break;
      default:
        break;
    }
  }, [step, navigate, codeModal, passwordModal]);

  return (
    <AuthPageLayout
      title="Регистрация"
      linkTo={APP_ROUTES.LOGIN}
      linkText="Войти"
      linkCaption="Уже есть аккаунт?"
    >
      <RegistrationPageForm />
      <CodeModal
        isActive={codeModal.isOpen}
        isLoading={codeModalLoading}
        onSubmitFn={handleVerifyEmailCode}
      >
        <>
          Код подтверждения отправлен на адрес
          {' '}
          <a href={`mailto: ${email}`}>{email}</a>.
          {' '}
          Чтобы продолжить, введите этот код.
        </>
      </CodeModal>
      <PasswordModal
        isActive={passwordModal.isOpen}
        text="Введите пароль для завершения регистрации."
        isLoading={passwordModalLoading}
        onSubmitFn={handleRegister}
      />
    </AuthPageLayout>
  );
};