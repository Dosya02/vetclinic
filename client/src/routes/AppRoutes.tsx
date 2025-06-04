import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ScrollToTop } from '@components';
import { AuthLayout, DefaultLayout } from '@layouts';
import {
  AppointmentPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  ServicesPage,
} from '@pages';
import { APP_ROUTES } from '@routes';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetMeQuery } from '@store/api';
import { useEffect } from 'react';
import { logout, setUser } from '@store/reducers';
import 'react-toastify/dist/ReactToastify.css';

export const AppRoutes: React.FC = () => {
  const { userToken } = useAppSelector(state => state.authReducer);

  const dispatch = useAppDispatch();

  const { data: userInfo, isSuccess, error } = useGetMeQuery(undefined, {
    skip: !userToken,
  });

  useEffect(() => {
    if (isSuccess && userInfo) {
      dispatch(setUser(userInfo));
    } else if (error) {
      dispatch(logout());
    }
  }, [isSuccess, userInfo, error, dispatch]);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route element={<HomePage />} path={APP_ROUTES.HOME} />
            <Route element={<ServicesPage />} path={APP_ROUTES.SERVICES} />
            <Route element={<AppointmentPage />} path={APP_ROUTES.APPOINTMENT} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route element={<LoginPage />} path={APP_ROUTES.LOGIN} />
            <Route
              element={<RegistrationPage />}
              path={APP_ROUTES.REGISTRATION}
            />
          </Route>
        </Routes>
      </Router>
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