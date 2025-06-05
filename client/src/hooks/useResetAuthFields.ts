import { useActions } from '@hooks';

export const useResetAuthFields = () => {
  const { resetAuthFields } = useActions();

  return () => resetAuthFields();
};
