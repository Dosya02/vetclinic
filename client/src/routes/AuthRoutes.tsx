import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { AuthLayout } from '@layouts';
import { APP_ROUTES } from '@routes';

const LoginPage = lazy(() => import('@pages/Login'));
const RegistrationPage = lazy(() => import('@pages/Registration'));

export const AuthRoutes: ReactNode = (
  <Route element={<AuthLayout/>}>
    <Route element={<LoginPage/>}
           path={APP_ROUTES.LOGIN}/>
    <Route element={<RegistrationPage/>}
           path={APP_ROUTES.REGISTRATION}/>
  </Route>
);