import { FC, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Input } from '@components';
import { AUTH_STEP } from '@constants';
import { useAgreeField, useEmailField } from '@hooks';
import { useSendVerificationCodeMutation } from '@store/api';
import { useAppDispatch } from '@store/hooks';
import { changeAgree, changeEmail, changeStep } from '@store/reducers';
import { getErrorMessage } from '@helpers';
import { validateAgree, validateEmail } from '@validators';

export const RegistrationPageForm: FC = () => {
  const dispatch = useAppDispatch();

  const { email, emailErrorMessage, onEmailChange } = useEmailField();
  const { agree, agreeErrorMessage, onAgreeChange } = useAgreeField();

  const [sendVerificationCode, { isLoading }] = useSendVerificationCodeMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const isEmailValid = !validateEmail(email);
    const isAgreeValid = !validateAgree(agree);

    if (!isEmailValid || !isAgreeValid) {
      dispatch(changeEmail(email));
      dispatch(changeAgree(agree));
      return;
    }

    try {
      const response = await sendVerificationCode({ email }).unwrap();
      toast.success(response.message);
      dispatch(changeStep(AUTH_STEP.CODE));
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