import { api } from "./api";

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		sendCode: builder.mutation({
			query: ({ email }) => ({
				url: "/auth/register",
				method: "POST",
				body: { email },
			}),
		}),
		verifyCode: builder.mutation({
			query: ({ email, verificationCode }) => ({
				url: "/auth/verify-code",
				method: "POST",
				body: { email, verificationCode },
			}),
		}),
		createPassword: builder.mutation({
			query: ({ email, password }) => ({
				url: "/auth/set-password",
				method: "POST",
				body: { email, password },
			}),
		}),
	}),
});

export const {
	useSendCodeMutation,
	useVerifyCodeMutation,
	useCreatePasswordMutation,
} = authApi;