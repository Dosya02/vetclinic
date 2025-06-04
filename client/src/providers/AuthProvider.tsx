import { FC, ReactNode, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMeQuery } from '@store/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setUser } from '@store/reducers';
import { useLogout } from '@hooks';

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { logout } = useLogout();
  const { userToken, userInfo } = useAppSelector(state => state.authReducer);

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetMeQuery(userToken ? undefined : skipToken);

  useEffect(() => {
    if (userToken && !userInfo) {
      refetch();
    }
  }, [userToken, userInfo, refetch]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError && error) {
      logout();
    }
  }, [isError, error, logout]);

  return <>{children}</>;
};
