import { apiUtilsActions } from '@store/api/utils';
import { authActions } from './auth/slice';
import { speciesActions } from './species/slice';
import { breedsActions } from './breeds/slice';

export const rootActions = {
  ...apiUtilsActions,
  ...authActions,
  ...speciesActions,
  ...breedsActions,
};