import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AccountDetails,
  AppointmentPage,
  HomePage,
  LoginPage,
  ProfileAppointments,
  ProfilePage,
  ProfilePets,
  PetDetails,
  RegistrationPage,
  ServicesPage
} from "./pages";
import { pageConfig } from "./config";
import { useAppDispatch, useAppSelector } from "./hooks";
import { AuthLayout, DefaultLayout } from "./layouts";
import { useGetUserInfoQuery } from "./store/api";
import { setCredentials } from "./store/reducers";
import { ScrollToTop } from "./utils";
import { ProtectedRoute } from "@components";

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
          <Route element={<ProtectedRoute />}>
            <Route path={pageConfig.profile} element={<ProfilePage />}>
              <Route
                path={pageConfig.profileAccountDetails}
                element={<AccountDetails />} />
              <Route
                path={pageConfig.profilePets}
                element={<ProfilePets />} />
              <Route
                path={pageConfig.profilePetDetails}
                element={<PetDetails />} />
              <Route
                path={pageConfig.profileAppointments}
                element={<ProfileAppointments />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}