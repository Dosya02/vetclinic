import { ChangeEvent, FC, FormEvent } from 'react';
import { Button, Input } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeEmail, changePassword } from '@store/reducers';

export const LoginPageForm: FC = () => {
  const {
    email,
    emailErrorMessage,
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);
  
  const dispatch = useAppDispatch();
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeEmail(value));
  };
  
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changePassword(value));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };
  
  return (
    <form className="c-auth__form" onSubmit={handleSubmit}>
      <div className="c-auth__form-field">
        <Input
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailErrorMessage}
          placeholder="Введите почту"
        />
      </div>
      <div className="c-auth__form-field">
        <Input
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordErrorMessage}
          placeholder="Введите пароль"
        />
        <span className="c-auth__form-forgot-password">Забыли пароль?</span>
      </div>
      <Button
        className="c-auth__form-button"
        text="Войти"
        type="submit"
      />
    </form>
  );
};