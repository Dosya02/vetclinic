import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthLayout, DefaultLayout } from 'src/layout'
import {
  LoginPage,
  RegistrationPage,
  HomePage,
  ProfilePage,
  ServicesPage,
  AppointmentPage,
} from 'src/pages'

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
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/appointment' element={<AppointmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}