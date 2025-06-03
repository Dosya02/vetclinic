import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeEmail } from '@store/reducers';

export const useEmailField = () => {
  const dispatch = useAppDispatch();

  const {
    email,
    emailErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    dispatch(changeEmail(value));
  };

  return { email, emailErrorMessage, onEmailChange };
};
