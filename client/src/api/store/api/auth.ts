import { api } from './api';
import { IUser } from '@models';

export const auth = api.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query<IUser, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserInfoQuery } = auth;