import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeAgree } from '@store/reducers/auth';

export const useAgreeField = () => {
  const dispatch = useAppDispatch();

  const {
    agree,
    agreeErrorMessage,
  } = useAppSelector(state => state.authReducer);

  const onAgreeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: boolean = e.target.checked;
    dispatch(changeAgree(value));
  };

  return { agree, agreeErrorMessage, onAgreeChange };
};
