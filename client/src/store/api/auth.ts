import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { AnyUser } from '@models'
import { api } from './api'

export const authApi = api.injectEndpoints({
	endpoints: builder => (
		{
			getMe: builder.query<AnyUser, void>({
				query: () => (
					{
						url: API_ROUTES.AUTH.ME,
						method: HTTP_METHOD.GET,
					}
				),
			}),
			login: builder.mutation<
				{ message: string; token: string },
				{ email: string; password: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.LOGIN,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			register: builder.mutation<
				{ message: string; token: string },
				{ email: string; password: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.REGISTER,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			resetPassword: builder.mutation<
				{ message: string, token: string },
				{ email: string; newPassword: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.RESET_PASSWORD,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			sendVerificationCode: builder.mutation<
				{ message: string },
				{ email: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.SEND_VERIFICATION_CODE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			sendPasswordResetCode: builder.mutation<
				{ message: string },
				{ email: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.SEND_PASSWORD_RESET_CODE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			verifyEmailCode: builder.mutation<
				{ message: string },
				{ email: string; code: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.VERIFY_EMAIL_CODE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
			verifyPasswordResetCode: builder.mutation<
				{ message: string },
				{ email: string; code: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.AUTH.VERIFY_PASSWORD_RESET_CODE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
			}),
		}
	),
})

export const {
	useGetMeQuery,
	useLoginMutation,
	useRegisterMutation,
	useResetPasswordMutation,
	useSendVerificationCodeMutation,
	useSendPasswordResetCodeMutation,
	useVerifyEmailCodeMutation,
	useVerifyPasswordResetCodeMutation,
} = authApi