import { FC, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { pageConfig } from "./config";
import { AuthLayout, DefaultLayout } from "./layouts";
import {
  AppointmentPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  ServicesPage
} from "./pages";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useGetUserInfoQuery } from "./store/api";
import { setCredentials } from "./store/reducers";
import { ScrollToTop } from "./utils";

export const App: FC = () => {
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
      <ScrollToTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={pageConfig.login} element={<LoginPage />} />
          <Route path={pageConfig.registration} element={<RegistrationPage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path={pageConfig.home} element={<HomePage />} />
          <Route path={pageConfig.services} element={<ServicesPage />} />
          <Route path={pageConfig.appointment} element={<AppointmentPage />} />
          <Route path={pageConfig.profile} element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}