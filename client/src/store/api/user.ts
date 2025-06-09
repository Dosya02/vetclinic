import { api } from './api'
import { API_ROUTES, HTTP_METHOD, type UserRole } from '@constants'
import type { UserModel, VetModel } from '@models'

const mapUsersResponse = (item: {
	_id: string
	email: string
	role: UserRole
	firstName?: string
	lastName?: string
	imageUrl?: string
	address?: string
	positions?: string[]
	pets?: string[]
	birthDate?: string
	appointments?: string[]
}): UserModel => ({
	id: item._id,
	email: item.email,
	role: item.role,
	firstName: item.firstName,
	lastName: item.lastName,
	imageUrl: item.imageUrl,
	address: item.address,
	positions: item.positions,
	pets: item.pets,
	birthDate: item.birthDate,
	appointments: item.appointments,
})

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
			transformResponse: (response: {
				message: string
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				users: any[]
			}) => (
				{
					message: response.message,
					users: response.users.map(mapUsersResponse),
				}
			),
			providesTags: (result) =>
				result
					? [
						...result.users.map((u) => ({
							type: 'Users' as const,
							id: u.id,
						})),
						{ type: 'Users', id: 'LIST' },
					]
					: [{ type: 'Users', id: 'LIST' }],
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
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
	}),
})

export const {
	useGetAllUsersQuery,
	useCreateVetMutation,
} = userApi
