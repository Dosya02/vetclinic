import { FC, FormEvent } from 'react';
import { Button, Input } from '@components';
import { useEmailField, useResetAuthFields } from '@hooks';
import { validateEmail } from '@validators';
import { changeEmail, changeStep } from '@store/reducers/auth';
import { toast } from 'react-toastify';
import { AUTH_STEP } from '@constants';
import { getErrorMessage } from '@helpers';
import { useAppDispatch } from '@store/hooks';

interface Props {
  isLoading: boolean;
  onSubmitFn: (data: { email: string }) => Promise<{ message: string }>;
}

export const EmailModalForm: FC<Props> = ({ isLoading, onSubmitFn }) => {
  const dispatch = useAppDispatch();
  const resetAuthFields = useResetAuthFields();

  const { email, emailErrorMessage, onEmailChange } = useEmailField();

  const handleCancel = () => {
    resetAuthFields();
    toast.info('Операция отменена');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = !validateEmail(email);

    if (!isEmailValid) {
      dispatch(changeEmail(email));
      return;
    }

    try {
      const response = await onSubmitFn({ email });
      toast.success(response.message);
      dispatch(changeStep(AUTH_STEP.CODE));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <form className="c-modal__form" onSubmit={handleSubmit}>
      <div className="c-modal__form-input">
        <Input
          value={email}
          onChange={onEmailChange}
          errorMessage={emailErrorMessage}
          placeholder="Введите почту"
        />
      </div>
      <div className="c-modal__buttons">
        <Button
          className="c-modal__button"
          type="button"
          text="Отмена"
          rounded
          reverse
          onClick={handleCancel}
        />
        <Button
          className="c-modal__button"
          text={isLoading ? 'Отправка...' : 'Подтвердить'}
          type="submit"
          rounded
          disabled={isLoading}
        />
      </div>
    </form>
  );
};