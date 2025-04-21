import { FC } from "react";
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

export const App: FC = () => {
  return (
    <Router>
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