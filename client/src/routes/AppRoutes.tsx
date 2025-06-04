import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Loader, ScrollToTop } from '@components';
import { USER_ROLES } from '@constants';
import { AuthLayout, DefaultLayout } from '@layouts';
import { APP_ROUTES, ProtectedRoute } from '@routes';
import { AuthProvider } from '@providers';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('@pages/Home'));
const ServicesPage = lazy(() => import('@pages/Services'));
const AppointmentPage = lazy(() => import('@pages/Appointment'));
const LoginPage = lazy(() => import('@pages/Login'));
const RegistrationPage = lazy(() => import('@pages/Registration'));
const AdminPage = lazy(() => import('@pages/Admin'));
const UnauthorizedPage = lazy(() => import('@pages/Unauthorized'));

export const AppRoutes: FC = () => (
  <>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop/>
        <Suspense fallback={<Loader/>}>
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
            <Route
              element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}/>}>
              <Route element={<AdminPage/>} path={APP_ROUTES.ADMIN}/>
            </Route>
            <Route element={<UnauthorizedPage/>}
                   path={APP_ROUTES.UNAUTHORIZED}/>
          </Routes>
        </Suspense>
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