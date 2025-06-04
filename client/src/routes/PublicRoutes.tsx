import { lazy, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { APP_ROUTES } from '@routes';

const UnauthorizedPage = lazy(() => import('@pages/Unauthorized'));

export const PublicRoutes: ReactNode = (
  <>
    <Route
      element={<UnauthorizedPage/>}
      path={APP_ROUTES.UNAUTHORIZED}
    />
  </>
);