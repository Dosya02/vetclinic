import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { USER_ROLES } from '@constants';
import { APP_ROUTES, ProtectedRoute } from '@routes';

const AdminPage = lazy(() => import('@pages/Admin'));
const AdminClientsPage = lazy(() => import('@pages/Admin/Clients'));
const AdminVetsPage = lazy(() => import('@pages/Admin/Vets'));
const AdminAdminsPage = lazy(() => import('@pages/Admin/Admins'));
const AdminPetsPage = lazy(() => import('@pages/Admin/Pets'));
const AdminSpeciesPage = lazy(() => import('@pages/Admin/Species'));
const AdminBreedsPage = lazy(() => import('@pages/Admin/Breeds'));
const AdminVaccinesPage = lazy(() => import('@pages/Admin/Vaccines'));

export const AdminRoutes: ReactNode = (
  <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}/>}>
    <Route element={<AdminPage/>} path={APP_ROUTES.ADMIN}>
      <Route element={<AdminClientsPage/>}
             path={APP_ROUTES.ADMIN_CLIENTS}/>
      <Route element={<AdminVetsPage/>}
             path={APP_ROUTES.ADMIN_VETS}/>
      <Route element={<AdminAdminsPage/>}
             path={APP_ROUTES.ADMIN_ADMINS}/>
      <Route element={<AdminPetsPage/>}
             path={APP_ROUTES.ADMIN_PETS}/>
      <Route element={<AdminSpeciesPage/>}
             path={APP_ROUTES.ADMIN_SPECIES}/>
      <Route element={<AdminBreedsPage/>}
             path={APP_ROUTES.ADMIN_BREEDS}/>
      <Route element={<AdminVaccinesPage/>}
             path={APP_ROUTES.ADMIN_VACCINES}/>
    </Route>
  </Route>
);