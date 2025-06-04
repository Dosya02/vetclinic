import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '@constants';
import { APP_ROUTES } from '@routes';
import { useAppSelector } from '@store/hooks';

interface Props {
  allowedRoles: UserRole[];
}

export const ProtectedRoute: FC<Props> = ({ allowedRoles }) => {
  const { userInfo } = useAppSelector((state) => state.authReducer);

  if (!userInfo) {
    return <Navigate to={APP_ROUTES.LOGIN} replace/>;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to={APP_ROUTES.UNAUTHORIZED} replace/>;
  }

  return <Outlet/>;
};