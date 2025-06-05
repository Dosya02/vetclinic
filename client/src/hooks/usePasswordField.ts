import { ChangeEvent } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';

export const usePasswordField = () => {
  const { changeAuthPassword } = useActions();

  const {
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeAuthPassword(e.target.value);
  };

  return { password, passwordErrorMessage, onPasswordChange };
};
