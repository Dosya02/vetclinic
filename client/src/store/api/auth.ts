import { api } from './api';
import { API_ROUTES, HTTP_METHOD } from '@constants';

export const authApi = api.injectEndpoints({
  endpoints: builder => (
    {
      sendVerificationCode: builder.mutation<void, { email: string }>({
        query: (body) => (
          {
            url: API_ROUTES.AUTH.SEND_CODE,
            method: HTTP_METHOD.POST,
            body,
          }
        ),
      }),
      verifyCode: builder.mutation<void, { email: string; code: string }>({
        query: (body) => (
          {
            url: API_ROUTES.AUTH.VERIFY_CODE,
            method: HTTP_METHOD.POST,
            body,
          }
        ),
      }),
      register: builder.mutation<void, {
        email: string;
        password: string;
        agree: boolean;
      }>({
        query: (body) => (
          {
            url: API_ROUTES.AUTH.REGISTER,
            method: HTTP_METHOD.POST,
            body,
          }
        ),
      }),
      login: builder.mutation<{ token: string }, {
        email: string;
        password: string
      }>({
        query: (body) => (
          {
            url: API_ROUTES.AUTH.LOGIN,
            method: HTTP_METHOD.POST,
            body,
          }
        ),
      }),
    }
  ),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
} = authApi;