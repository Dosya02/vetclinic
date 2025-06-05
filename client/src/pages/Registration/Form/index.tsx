import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Input } from '@components';
import { AUTH_STEP } from '@constants';
import { useActions, useAgreeField, useEmailField } from '@hooks';
import { useSendVerificationCodeMutation } from '@store/api';
import { getErrorMessage } from '@helpers';
import { validateAgree, validateEmail } from '@validators';

export const RegistrationPageForm: FC = () => {
  const { changeAuthAgree, changeAuthEmail, changeAuthStep } = useActions();

  const { email, emailErrorMessage, onEmailChange } = useEmailField();
  const { agree, agreeErrorMessage, onAgreeChange } = useAgreeField();

  const [sendVerificationCode, { isLoading }] = useSendVerificationCodeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = !validateEmail(email);
    const isAgreeValid = !validateAgree(agree);

    if (!isEmailValid || !isAgreeValid) {
      changeAuthEmail(email);
      changeAuthAgree(agree);
      return;
    }

    try {
      const response = await sendVerificationCode({ email }).unwrap();
      toast.success(response.message);
      changeAuthStep(AUTH_STEP.CODE);
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
        <Checkbox
          label="Я согласен с условиями предоставления услуг"
          checked={agree}
          onChange={onAgreeChange}
          errorMessage={agreeErrorMessage}
        />
      </div>
      <Button
        className="c-auth__form-button"
        text={isLoading ? 'Отправка...' : 'Регистрация'}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};