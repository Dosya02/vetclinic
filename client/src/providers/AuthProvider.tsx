import { FC, ReactNode, useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMeQuery } from '@store/api';
import { useAppSelector } from '@store/hooks';
import { useActions, useLogout } from '@hooks';
import { Loader } from '@components';

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const { setAuthUser } = useActions();
  const { logout } = useLogout();

  const { userToken, userInfo } = useAppSelector(state => state.authReducer);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetMeQuery(userToken ? undefined : skipToken);

  useEffect(() => {
    if (userToken && !userInfo) {
      setIsUserLoading(true);
      refetch();
    }
  }, [userToken, userInfo, refetch]);

  useEffect(() => {
    if (isSuccess && data) {
      setAuthUser(data);
      setIsUserLoading(false);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      logout();
      setIsUserLoading(false);
    }
  }, [isError, error, logout]);

  if (isUserLoading || (
    userToken && !userInfo && isFetching
  )) {
    return <Loader/>;
  }

  return <>{children}</>;
};
