import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from '@utils';
import { AuthLayout, Index } from '@layouts';
import {
  AccountDetails,
  AppointmentPage,
  HomePage,
  LoginPage,
  PetDetails,
  ProfileAppointments,
  ProfilePage,
  ProfilePets,
  RegistrationPage,
  ServicesPage,
} from '@pages';
import { ProtectedRoute } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetUserInfoQuery } from '@store/api';
import { setCredentials } from '@store/reducers';
import { APP_ROUTES } from '@routes';

export const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector(state => state.authReducer);
  const { data: userInfo, isSuccess } = useGetUserInfoQuery(undefined, {
    skip: !userToken,
  });
  
  useEffect(() => {
    if (isSuccess && userInfo) {
      dispatch(setCredentials({ userInfo }));
    }
  }, [isSuccess, userInfo, dispatch]);
  
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage/>}/>
          <Route path={APP_ROUTES.REGISTRATION}
                 element={<RegistrationPage/>}/>
        </Route>
        <Route element={<Index/>}>
          <Route path={APP_ROUTES.HOME} element={<HomePage/>}/>
          <Route path={APP_ROUTES.SERVICES}
                 element={<ServicesPage/>}/>
          <Route path={APP_ROUTES.APPOINTMENT}
                 element={<AppointmentPage/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route
              path={APP_ROUTES.PROFILE}
              element={<ProfilePage/>}
            >
              <Route
                path={APP_ROUTES.PROFILE_ACCOUNT_DETAILS}
                element={<AccountDetails/>}/>
              <Route
                path={APP_ROUTES.PROFILE_PETS}
                element={<ProfilePets/>}/>
              <Route
                path={APP_ROUTES.PROFILE_PET_DETAILS}
                element={<PetDetails/>}/>
              <Route
                path={APP_ROUTES.PROFILE_APPOINTMENTS}
                element={<ProfileAppointments/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};