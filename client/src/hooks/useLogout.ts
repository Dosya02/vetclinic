import { authApi } from '@store/api';
import { useAppDispatch } from '@store/hooks';
import { logout as logoutAction } from '@store/reducers/auth';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
    dispatch(authApi.util.resetApiState());
  };

  return { logout };
};
