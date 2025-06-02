import { ChangeEvent, FC, FormEvent } from 'react';
import { Button, Checkbox, Input } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeAgree, changeEmail } from '@store/reducers';

export const RegistrationPageForm: FC = () => {
  const {
    email,
    emailErrorMessage,
    agree,
    agreeErrorMessage,
  } = useAppSelector(state => state.authReducer);
  
  const dispatch = useAppDispatch();
  
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(changeEmail(value));
  };
  
  const handleAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    dispatch(changeAgree(value));
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
        <Checkbox
          label="Я согласен с условиями предоставления услуг"
          checked={agree}
          onChange={handleAgreeChange}
          errorMessage={agreeErrorMessage}
        />
      </div>
      <Button
        className="c-auth__form-button"
        text="Регистрация"
        type="submit"
      />
    </form>
  );
};