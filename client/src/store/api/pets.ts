import { api } from './api'
import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { PetModel } from '@models'

const mapPetResponse = (item: {
	_id: string
	name: string
	speciesId: string
	breedId: string
	ownerId: string
	birthdate: string
	gender: string
	features?: string[]
	imageUrl?: string
}): PetModel => ({
	id: item._id,
	name: item.name,
	speciesId: item.speciesId,
	breedId: item.breedId,
	ownerId: item.ownerId,
	birthDate: {
		day: new Date(item.birthdate).getDate(),
		month: new Date(item.birthdate).getMonth() + 1,
		year: new Date(item.birthdate).getFullYear(),
	},
	gender: item.gender as PetModel['gender'],
	features: item.features ?? [],
	imageUrl: item.imageUrl,
})

export const petsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getPets: builder.query<
			{ message: string; pets: PetModel[] },
			void
		>({
			query: () => ({
				url: API_ROUTES.PETS.GET_ALL,
				method: HTTP_METHOD.GET,
			}),
			transformResponse: (response: {
				message: string
				pets: any[]
			}) => ({
				message: response.message,
				pets: response.pets.map(mapPetResponse),
			}),
			providesTags: (result) =>
				result
					? [
						...result.pets.map((p) => ({
							type: 'Pets' as const,
							id: p.id,
						})),
						{ type: 'Pets', id: 'LIST' },
					]
					: [{ type: 'Pets', id: 'LIST' }],
		}),
		createPet: builder.mutation<
			{ message: string; pet: PetModel },
			FormData
		>({
			query: (body) => ({
				url: API_ROUTES.PETS.CREATE,
				method: HTTP_METHOD.POST,
				body,
			}),
			invalidatesTags: [{ type: 'Pets', id: 'LIST' }],
		}),
		updatePet: builder.mutation<
			{ message: string; pet: PetModel },
			{ id: string; data: FormData }
		>({
			query: ({ id, data }) => ({
				url: API_ROUTES.PETS.UPDATE(id),
				method: HTTP_METHOD.PUT,
				body: data,
			}),
			invalidatesTags: (_res, _err, { id }) => [
				{ type: 'Pets', id },
				{ type: 'Pets', id: 'LIST' },
			],
		}),
		deletePet: builder.mutation<
			{ message: string },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: API_ROUTES.PETS.DELETE(id),
				method: HTTP_METHOD.DELETE,
			}),
			invalidatesTags: (_res, _err, { id }) => [
				{ type: 'Pets', id },
				{ type: 'Pets', id: 'LIST' },
			],
		}),
	}),
})

export const {
	useGetPetsQuery,
	useCreatePetMutation,
	useUpdatePetMutation,
	useDeletePetMutation,
} = petsApi
