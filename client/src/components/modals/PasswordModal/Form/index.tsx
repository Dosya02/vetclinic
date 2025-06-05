import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, PasswordInput } from '@components';
import { useActions, usePasswordField, useResetAuthFields } from '@hooks';
import { APP_ROUTES } from '@routes';
import { useAppSelector } from '@store/hooks';
import { getErrorMessage } from '@helpers';

interface Props {
  isLoading: boolean;
  onSubmitFn: (data: { email: string; password: string; }) => Promise<{
    message: string;
    token: string;
  }>;
}

export const PasswordModalForm: FC<Props> = ({ isLoading, onSubmitFn }) => {
  const navigate = useNavigate();
  const { setAuthToken } = useActions();
  const resetAuthFields = useResetAuthFields();

  const { email } = useAppSelector(state => state.authReducer);
  const {
    password,
    passwordErrorMessage,
    onPasswordChange,
  } = usePasswordField();

  const handleCancel = () => {
    toast.info('Операция отменена');
    resetAuthFields();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await onSubmitFn({ email, password });
      toast.success(response.message);

      setAuthToken(response.token);

      resetAuthFields();
      navigate(APP_ROUTES.HOME);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form className="c-modal__form" onSubmit={handleSubmit}>
      <div className="c-modal__form-input">
        <PasswordInput
          placeholder="Введите пароль"
          value={password}
          onChange={onPasswordChange}
          errorMessage={passwordErrorMessage}
        />
      </div>
      <div className="c-modal__buttons">
        <Button
          className="c-modal__button"
          type="button"
          text="Отмена"
          reverse
          rounded
          onClick={handleCancel}
        />
        <Button
          className="c-modal__button"
          text={isLoading ? 'Загрузка...' : 'Подтвердить'}
          type="submit"
          rounded
          disabled={isLoading}
        />
      </div>
    </form>
  );
};