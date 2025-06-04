import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { USER_ROLES } from '@constants';
import { APP_ROUTES, ProtectedRoute } from '@routes';

const AdminPage = lazy(() => import('@pages/Admin'));
const AdminPetsPage = lazy(() => import('@pages/Admin/Pets'));
const AdminSpeciesPage = lazy(() => import('@pages/Admin/Species'));
const AdminBreedsPage = lazy(() => import('@pages/Admin/Breeds'));

export const AdminRoutes: ReactNode = (
  <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}/>}>
    <Route element={<AdminPage/>} path={APP_ROUTES.ADMIN}>
      <Route element={<AdminPetsPage/>}
             path={APP_ROUTES.ADMIN_PETS}/>
      <Route element={<AdminSpeciesPage/>}
             path={APP_ROUTES.ADMIN_PET_SPECIES}/>
      <Route element={<AdminBreedsPage/>}
             path={APP_ROUTES.ADMIN_PET_BREEDS}/>
    </Route>
  </Route>
);