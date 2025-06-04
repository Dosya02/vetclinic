import { FC, ReactNode, useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetMeQuery } from '@store/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setUser } from '@store/reducers/auth';
import { useLogout } from '@hooks';
import { Loader } from '@components';

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
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
      dispatch(setUser(data));
      setIsUserLoading(false);
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError && error) {
      logout();
      setIsUserLoading(false);
    }
  }, [isError, error, logout]);

  if (isUserLoading || (
    userToken && !userInfo && isFetching
  )) {
    return <Loader />;
  }

  return <>{children}</>;
};
