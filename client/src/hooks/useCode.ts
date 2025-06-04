import { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeCode, setFullCode } from '@store/reducers/auth';

export const useCode = () => {
  const dispatch = useAppDispatch();

  const { code, codeErrorMessage } = useAppSelector(state => state.authReducer);

  const onCodeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value: string = e.target.value;

    if (!/^\d?$/.test(value)) {
      return;
    }

    dispatch(changeCode({ index, value }));

    if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
      e.target.nextElementSibling.focus();
    }
  };

  const onCodeKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prev = e.currentTarget.previousElementSibling as HTMLInputElement;
      if (prev) {
        prev.focus();
      }
    }
  };

  const onCodePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData
      .getData('Text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!pastedData) {
      return;
    }

    const digits = pastedData.split('').slice(0, 6);

    dispatch(setFullCode(digits));

    e.preventDefault();

    setTimeout(() => {
      const inputs = document.querySelectorAll('input.c-input--pin');

      for (let i = 0; i < inputs.length; i++) {
        if ((
          inputs[i] as HTMLInputElement
        ).value === '') {
          (
            inputs[i] as HTMLInputElement
          ).focus();
          return;
        }
      }

      const lastIndex = digits.length - 1;

      if (inputs[lastIndex]) {
        (
          inputs[lastIndex] as HTMLInputElement
        ).focus();
      }
    }, 0);
  };

  return {
    code,
    codeErrorMessage,
    onCodeChange,
    onCodeKeyDown,
    onCodePaste,
  };
};
