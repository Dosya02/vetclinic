import { authApi } from '@store/api';
import { useAppDispatch } from '@store/hooks';
import { logout as logoutAction } from '@store/reducers';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
    dispatch(authApi.util.resetApiState());
  };

  return { logout };
};
