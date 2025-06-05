import { ChangeEvent } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';

export const useEmailField = () => {
  const { changeAuthEmail } = useActions();

  const {
    email,
    emailErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeAuthEmail(e.target.value);
  };

  return { email, emailErrorMessage, onEmailChange };
};
