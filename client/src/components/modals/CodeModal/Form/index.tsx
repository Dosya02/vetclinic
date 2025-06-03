import { FC } from 'react';
import { toast } from 'react-toastify';
import { Button, ErrorMessage, PinInput } from '@components';
import { AUTH_STEP } from '@constants';
import { useCode, useResetAuthFields } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeStep, setFullCode } from '@store/reducers';
import { getErrorMessage } from '@helpers';

interface Props {
  isLoading: boolean;
  onSubmitFn: (data: { email: string; code: string }) => Promise<{
    message: string
  }>;
}

export const CodeModalForm: FC<Props> = ({ isLoading, onSubmitFn }) => {
  const dispatch = useAppDispatch();
  const resetAuthFields = useResetAuthFields();

  const { email } = useAppSelector(state => state.authReducer);
  const {
    code,
    codeErrorMessage,
    onCodeChange,
    onCodeKeyDown,
    onCodePaste,
  } = useCode();

  const handleCancel = () => {
    resetAuthFields();
    toast.info('Операция отменена');
  };

  const handleSubmit = async (): Promise<void> => {
    const fullCode = code.join('');
    if (fullCode.length !== 6 || code.some(d => d === '')) {
      dispatch(setFullCode(code));
      return;
    }

    try {
      const response = await onSubmitFn({ email, code: fullCode });
      toast.success(response.message);
      dispatch(changeStep(AUTH_STEP.PASSWORD));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="c-modal__wrapper">
      <div className="c-modal__inputs">
        {code.map((digit, index) => (
          <PinInput
            key={index}
            value={digit}
            onChange={(e) => onCodeChange(e, index)}
            onKeyDown={(e) => onCodeKeyDown(e, index)}
            onPaste={onCodePaste}
          />
        ))}
        <div className="c-modal__error">
          {codeErrorMessage && <ErrorMessage message={codeErrorMessage}/>}
        </div>
      </div>
      <div className="c-modal__buttons">
        <Button
          className="c-modal__button"
          text="Отмена"
          type="button"
          reverse
          rounded
          onClick={handleCancel}
        />
        <Button
          className="c-modal__button"
          text={isLoading ? 'Проверка...' : 'Отправить'}
          type="button"
          rounded
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};