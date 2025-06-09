import { api } from './api'
import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { BreedModel } from '@models'

const mapBreedsResponse = (item: {
	_id: string
	name: string
	speciesId: string
}): BreedModel => (
	{
		id: item._id,
		name: item.name,
		speciesId: item.speciesId,
	}
)

export const breedsApi = api.injectEndpoints({
	endpoints: (builder) => (
		{
			getBreeds: builder.query<
				{ message: string; breeds: BreedModel[] },
				void
			>({
				query: () => (
					{
						url: API_ROUTES.BREEDS.GET_ALL,
						method: HTTP_METHOD.GET,
					}
				),
				transformResponse: (response: {
					message: string
					breeds: { _id: string; name: string; speciesId: string }[]
				}) => (
					{
						message: response.message,
						breeds: response.breeds.map(mapBreedsResponse),
					}
				),
				providesTags: (result) => {
					if (!result) {
						return [{ type: 'Breeds', id: 'LIST' }]
					}

					const itemTags = result.breeds.map((b) => (
						{
							type: 'Breeds' as const,
							id: b.id,
						}
					))

					return [...itemTags, { type: 'Breeds', id: 'LIST' }]
				},
			}),
			createBreed: builder.mutation<
				{ message: string; breed: BreedModel },
				{ name: string; speciesId: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.BREEDS.CREATE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
				invalidatesTags: [{ type: 'Breeds', id: 'LIST' }],
			}),
			updateBreed: builder.mutation<
				{ message: string; breed: BreedModel },
				{ id: string; name: string; speciesId: string }
			>({
				query: ({ id, ...rest }) => (
					{
						url: API_ROUTES.BREEDS.UPDATE(id),
						method: HTTP_METHOD.PUT,
						body: rest,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [
					{ type: 'Breeds', id },
				],
			}),
			deleteBreed: builder.mutation<
				{ message: string },
				{ id: string }
			>({
				query: ({ id }) => (
					{
						url: API_ROUTES.BREEDS.DELETE(id),
						method: HTTP_METHOD.DELETE,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [
					{ type: 'Breeds', id },
					{ type: 'Breeds', id: 'LIST' },
				],
			}),
		}
	),
})

export const {
	useGetBreedsQuery,
	useCreateBreedMutation,
	useUpdateBreedMutation,
	useDeleteBreedMutation,
} = breedsApi