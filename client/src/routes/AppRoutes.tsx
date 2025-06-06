import { FC, Suspense, useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader, ScrollToTop } from '@components';
import { useActions, useLogout } from '@hooks';
import { useGetMeQuery } from '@store/api';
import { useAppSelector } from '@store/hooks';
import 'react-toastify/dist/ReactToastify.css';
import { PublicRoutes } from './PublicRoutes.tsx';
import { DefaultRoutes } from './DefaultRoutes.tsx';
import { AuthRoutes } from './AuthRoutes.tsx';
import { AdminRoutes } from './AdminRoutes.tsx';

export const AppRoutes: FC = () => {
  const { setAuthUser } = useActions();
  const { logout } = useLogout();
  const { userToken, userInfo } = useAppSelector(state => state.authReducer);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const {
    data,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching: isUserFetching,
  } = useGetMeQuery(userToken ? undefined : skipToken);


  const isLoading =
    isUserLoading ||
    (
      userToken && !userInfo && isUserFetching
    );

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
  }, [isSuccess, data, setAuthUser]);

  useEffect(() => {
    if (isError && error) {
      logout();
      setIsUserLoading(false);
    }
  }, [isError, error, logout]);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Suspense fallback={<Loader/>}>
          <Routes>
            {PublicRoutes}
            {DefaultRoutes}
            {AuthRoutes}
            {AdminRoutes}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};