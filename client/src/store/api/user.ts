import { api } from './api'
import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { UserModel, VetModel } from '@models'

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query<
			{ message: string, users: UserModel[] },
			void
		>({
			query: () => ({
				url: API_ROUTES.USER.GET_ALL,
				method: HTTP_METHOD.GET,
			}),
		}),
		createVet: builder.mutation<
			{ message: string, user: VetModel },
			FormData
		>({
			query: (body) => ({
				url: API_ROUTES.USER.VETS,
				method: HTTP_METHOD.POST,
				body,
			}),
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useCreateVetMutation,
} = userApi
