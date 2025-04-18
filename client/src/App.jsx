import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthLayout, DefaultLayout } from "src/layout";
import {
  AboutUsPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  ServicesPage,
  TeamPage
} from "src/pages";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about-us' element={<AboutUsPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/team' element={<TeamPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}