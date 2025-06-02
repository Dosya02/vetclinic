import { ChangeEvent, FC, FormEvent } from 'react';
import { Button, Input } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeEmail } from '@store/reducers';

export const EmailModalForm: FC = () => {
  const {
    email,
    emailErrorMessage,
  } = useAppSelector(state => state.authReducer);
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(changeEmail(value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  };

  return (
    <form className="c-modal-email__form" onSubmit={handleSubmit}>
      <div className="c-modal-email__form-input">
        <Input
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailErrorMessage}
          placeholder="Введите почту"
        />
      </div>
      <Button
        className="c-modal-email__form-button"
        text="Подтвердить"
        type="submit"
      />
    </form>
  );
};