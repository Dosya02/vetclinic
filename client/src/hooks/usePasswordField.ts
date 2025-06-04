import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changePassword } from '@store/reducers/auth';

export const usePasswordField = () => {
  const dispatch = useAppDispatch();

  const {
    password,
    passwordErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(changePassword(value));
  };

  return { password, passwordErrorMessage, onPasswordChange };
};
