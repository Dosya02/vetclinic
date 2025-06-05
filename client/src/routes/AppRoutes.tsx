import { FC, Suspense, useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader, ScrollToTop } from '@components';
import { AdminRoutes, AuthRoutes, DefaultRoutes, PublicRoutes } from '@routes';
import { useActions, useLoadBreeds, useLoadSpecies, useLogout } from '@hooks';
import { useGetMeQuery } from '@store/api';
import { useAppSelector } from '@store/hooks';
import 'react-toastify/dist/ReactToastify.css';

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

  const { isFetching: isSpeciesFetching } = useLoadSpecies();
  const { isFetching: isBreedsFetching } = useLoadBreeds();

  const isLoading =
    isUserLoading ||
    (
      userToken && !userInfo && isUserFetching
    ) ||
    isSpeciesFetching ||
    isBreedsFetching;

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