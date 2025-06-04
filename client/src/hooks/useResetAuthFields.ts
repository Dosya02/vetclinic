import { useAppDispatch } from '@store/hooks';
import { resetFields } from '@store/reducers/auth';

export const useResetAuthFields = () => {
  const dispatch = useAppDispatch();

  return () => dispatch(resetFields());
};
