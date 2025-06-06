import { apiUtilsActions } from '@store/api/utils';
import { authActions } from './auth/slice';

export const rootActions = {
  ...apiUtilsActions,
  ...authActions,
};