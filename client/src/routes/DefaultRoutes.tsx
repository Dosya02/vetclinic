import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { DefaultLayout } from '@layouts';
import { APP_ROUTES } from '@routes';

const HomePage = lazy(() => import('@pages/Home'));
const ServicesPage = lazy(() => import('@pages/Services'));
const AppointmentPage = lazy(() => import('@pages/Appointment'));

export const DefaultRoutes: ReactNode = (
  <Route element={<DefaultLayout/>}>
    <Route element={<HomePage/>}
           path={APP_ROUTES.HOME}/>
    <Route element={<ServicesPage/>}
           path={APP_ROUTES.SERVICES}/>
    <Route element={<AppointmentPage/>}
           path={APP_ROUTES.APPOINTMENT}/>
  </Route>
);