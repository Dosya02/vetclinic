import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, PasswordInput } from '@components';
import { usePasswordField, useResetAuthFields } from '@hooks';
import { APP_ROUTES } from '@routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setToken } from '@store/reducers';
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
  const dispatch = useAppDispatch();
  const resetAuthFields = useResetAuthFields();

  const { email } = useAppSelector(state => state.authReducer);
  const {
    password,
    passwordErrorMessage,
    onPasswordChange,
  } = usePasswordField();

  const handleCancel = () => {
    resetAuthFields();
    toast.info('Операция отменена');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await onSubmitFn({ email, password });
      toast.success(response.message);

      dispatch(setToken(response.token));

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