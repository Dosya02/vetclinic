import { ChangeEvent } from 'react';
import { useActions } from '@hooks';
import { useAppSelector } from '@store/hooks';

export const useAgreeField = () => {
  const { changeAuthAgree } = useActions();

  const {
    agree,
    agreeErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeAuthAgree(e.target.checked);
  };

  return { agree, agreeErrorMessage, onAgreeChange };
};
