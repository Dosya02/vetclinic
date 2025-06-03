import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input, PasswordInput } from '@components';
import { APP_ROUTES } from '@routes';
import { useLoginMutation } from '@store/api';
import { useAppDispatch } from '@store/hooks';
import {
  changeEmail,
  changePassword,
  changeStep,
  setToken,
} from '@store/reducers';
import { validateEmail, validatePassword } from '@validators';
import { getErrorMessage } from '@helpers';
import { useEmailField, usePasswordField, useResetAuthFields } from '@hooks';
import { AUTH_STEP } from '@constants';

export const LoginPageForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const resetAuthFields = useResetAuthFields();

  const { email, emailErrorMessage, onEmailChange } = useEmailField();
  const {
    password,
    passwordErrorMessage,
    onPasswordChange,
  } = usePasswordField();

  const [login, { isLoading }] = useLoginMutation();

  const handleResetPassword = () => {
    resetAuthFields();
    dispatch(changeStep(AUTH_STEP.EMAIL));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = !validateEmail(email);
    const isPasswordValid = !validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      dispatch(changeEmail(email));
      dispatch(changePassword(password));
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();
      toast.success(response.message);
      resetAuthFields();
      dispatch(setToken(response.token));
      navigate(APP_ROUTES.HOME);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form className="c-auth__form" onSubmit={handleSubmit}>
      <div className="c-auth__form-field">
        <Input
          value={email}
          onChange={onEmailChange}
          errorMessage={emailErrorMessage}
          placeholder="Введите почту"
        />
      </div>
      <div className="c-auth__form-field">
        <PasswordInput
          value={password}
          onChange={onPasswordChange}
          errorMessage={passwordErrorMessage}
          placeholder="Введите пароль"
        />
        <span
          className="c-auth__form-forgot-password"
          onClick={handleResetPassword}
        >
          Забыли пароль?
        </span>
      </div>
      <Button
        className="c-auth__form-button"
        text={isLoading ? 'Входим...' : 'Войти'}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};