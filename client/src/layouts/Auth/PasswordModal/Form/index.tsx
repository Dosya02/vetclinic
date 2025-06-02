import { ChangeEvent, FC, FormEvent } from 'react';
import { Button, PasswordInput } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changePassword } from '@store/reducers';

export const PasswordModalForm: FC = () => {
  const {
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(changePassword(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };

  return (
    <form className="c-modal-password__form" onSubmit={handleSubmit}>
      <div className="c-modal-password__form-input">
        <PasswordInput
          placeholder="Введите пароль"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordErrorMessage}
        />
      </div>
      <Button
        className="c-modal-password__form-button"
        text="Подтвердить"
        type="submit"
      />
    </form>
  );
};