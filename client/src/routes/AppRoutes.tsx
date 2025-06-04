import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@providers';

export const AppRoutes: React.FC = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop/>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route element={<HomePage/>} path={APP_ROUTES.HOME}/>
            <Route element={<ServicesPage/>} path={APP_ROUTES.SERVICES}/>
            <Route element={<AppointmentPage/>}
                   path={APP_ROUTES.APPOINTMENT}/>
          </Route>
          <Route element={<AuthLayout/>}>
            <Route element={<LoginPage/>} path={APP_ROUTES.LOGIN}/>
            <Route
              element={<RegistrationPage/>}
              path={APP_ROUTES.REGISTRATION}
            />
          </Route>
        </Routes>
      </AuthProvider>
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