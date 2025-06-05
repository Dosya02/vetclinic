import { useActions } from '@hooks';

export const useLogout = () => {
  const { logout: logoutAction, resetAuthApi } = useActions();

  const logout = () => {
    logoutAction();
    resetAuthApi();
  };

  return { logout };
};
