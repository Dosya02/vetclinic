import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { USER_ROLES } from '@constants';
import { APP_ROUTES, ProtectedRoute } from '@routes';

const ProfilePage = lazy(() => import('@pages/Profile'));
const ProfileAccountDetailsPage = lazy(() => import('@pages/Profile/AccountDetails'));
const ProfilePetsPage = lazy(() => import('@pages/Profile/Pets'));
const ProfileAppointmentsPage = lazy(() => import('@pages/Profile/Appointments'));

export const ProfileRoutes: ReactNode = (
  <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.CLIENT]}/>}>
    <Route element={<ProfilePage/>} path={APP_ROUTES.PROFILE}>
      <Route element={<ProfileAccountDetailsPage/>}
             path={APP_ROUTES.PROFILE_ACCOUNT_DETAILS}/>
      <Route element={<ProfilePetsPage/>} path={APP_ROUTES.PROFILE_PETS}/>
      <Route element={<ProfileAppointmentsPage/>}
             path={APP_ROUTES.PROFILE_APPOINTMENTS}/>
    </Route>
  </Route>
);