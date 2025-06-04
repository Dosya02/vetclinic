import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthPageLayout,
  CodeModal,
  EmailModal,
  PasswordModal,
} from '@components';
import { AUTH_STEP } from '@constants';
import { useModal } from '@hooks';
import { APP_ROUTES } from '@routes';
import {
  useResetPasswordMutation,
  useSendPasswordResetCodeMutation,
  useVerifyPasswordResetCodeMutation,
} from '@store/api';
import { useAppSelector } from '@store/hooks';
import { LoginPageForm } from './Form';

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const { email, step } = useAppSelector(state => state.authReducer);

  const emailModal = useModal(false);
  const codeModal = useModal(false);
  const passwordModal = useModal(false);

  const [verifyPasswordResetCode, { isLoading: codeModalLoading }] = useVerifyPasswordResetCodeMutation();
  const [sendPasswordResetCode, { isLoading: emailModalLoading }] = useSendPasswordResetCodeMutation();
  const [resetPassword, { isLoading: passwordModalLoading }] = useResetPasswordMutation();

  const handleVerifyPasswordResetCode = async ({ email, code }: {
    email: string;
    code: string;
  }): Promise<{ message: string }> => {
    return await verifyPasswordResetCode({ email, code }).unwrap();
  };

  const handleSendPasswordResetCode = async ({ email }: {
    email: string;
  }): Promise<{ message: string }> => {
    return await sendPasswordResetCode({ email }).unwrap();
  };

  const handleResetPassword = async ({ email, password }: {
    email: string;
    password: string
  }): Promise<{
    message: string;
    token: string;
  }> => {
    return await resetPassword({ email, newPassword: password }).unwrap();
  };

  useEffect(() => {
    switch (step) {
      case AUTH_STEP.IDLE:
        codeModal.close();
        emailModal.close();
        passwordModal.close();
        break;
      case AUTH_STEP.CODE:
        codeModal.open();
        emailModal.close();
        passwordModal.close();
        break;
      case AUTH_STEP.EMAIL:
        codeModal.close();
        emailModal.open();
        passwordModal.close();
        break;
      case AUTH_STEP.PASSWORD:
        codeModal.close();
        emailModal.close();
        passwordModal.open();
        break;
      case AUTH_STEP.DONE:
        codeModal.close();
        emailModal.close();
        passwordModal.close();
        navigate(APP_ROUTES.HOME);
        break;
      default:
        break;
    }
  }, [step, navigate, codeModal, emailModal, passwordModal]);

  return (
    <AuthPageLayout
      title="Войти в личный кабинет"
      linkTo={APP_ROUTES.REGISTRATION}
      linkText="Регистрация"
      linkCaption="Ещё нет аккаунта?"
    >
      <LoginPageForm/>
      <CodeModal
        isActive={codeModal.isOpen}
        isLoading={codeModalLoading}
        onSubmitFn={handleVerifyPasswordResetCode}
      >
        <>
          Код для сброса пароля отправлен на адрес
          {' '}
          <a href={`mailto:${email}`}>{email}</a>.
          {' '}
          Чтобы продолжить, введите этот код.
        </>
      </CodeModal>
      <EmailModal
        isActive={emailModal.isOpen}
        text="Для восстановления пароля введи вашу почту."
        isLoading={emailModalLoading}
        onSubmitFn={handleSendPasswordResetCode}
      />
      <PasswordModal
        isActive={passwordModal.isOpen}
        text="Пожалуйста, придумайте и введите новый пароль для вашего аккаунта, чтобы
        завершить восстановление доступа."
        isLoading={passwordModalLoading}
        onSubmitFn={handleResetPassword}
      />
    </AuthPageLayout>
  );
};

export default LoginPage;