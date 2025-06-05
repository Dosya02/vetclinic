import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Input } from '@components';
import { AUTH_STEP } from '@constants';
import { useActions, useEmailField, useResetAuthFields } from '@hooks';
import { getErrorMessage } from '@helpers';
import { validateEmail } from '@validators';

interface Props {
  isLoading: boolean;
  onSubmitFn: (data: { email: string }) => Promise<{ message: string }>;
}

export const EmailModalForm: FC<Props> = ({ isLoading, onSubmitFn }) => {
  const { changeAuthStep, changeAuthEmail } = useActions();
  const resetAuthFields = useResetAuthFields();

  const { email, emailErrorMessage, onEmailChange } = useEmailField();

  const handleCancel = () => {
    toast.info('Операция отменена');
    resetAuthFields();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = !validateEmail(email);

    if (!isEmailValid) {
      changeAuthEmail(email);
      return;
    }

    try {
      const response = await onSubmitFn({ email });
      toast.success(response.message);
      changeAuthStep(AUTH_STEP.CODE);
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