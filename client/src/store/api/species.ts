import { api } from './api'
import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { SpeciesModel } from '@models'

const mapSpeciesResponse = (item: {
	_id: string
	name: string
}): SpeciesModel => (
	{
		id: item._id,
		name: item.name,
	}
)

export const speciesApi = api.injectEndpoints({
	endpoints: (builder) => (
		{
			getSpecies: builder.query<
				{ message: string; species: SpeciesModel[] },
				void
			>({
				query: () => (
					{
						url: API_ROUTES.SPECIES.GET_ALL,
						method: HTTP_METHOD.GET,
					}
				),
				transformResponse: (response: {
					message: string
					species: { _id: string; name: string }[]
				}) => (
					{
						message: response.message,
						species: response.species.map(mapSpeciesResponse),
					}
				),
				providesTags: (result) => {
					if (!result) {
						return [{ type: 'Species', id: 'LIST' }]
					}

					const itemTags = result.species.map((s) => (
						{
							type: 'Species' as const,
							id: s.id,
						}
					))

					return [...itemTags, { type: 'Species', id: 'LIST' }]
				},
			}),
			createSpecies: builder.mutation<
				{ message: string; species: SpeciesModel },
				{ name: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.SPECIES.CREATE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
				invalidatesTags: [{ type: 'Species', id: 'LIST' }],
			}),
			updateSpecies: builder.mutation<
				{ message: string; species: SpeciesModel },
				{ id: string; name: string }
			>({
				query: ({ id, ...rest }) => (
					{
						url: API_ROUTES.SPECIES.UPDATE(id),
						method: HTTP_METHOD.PUT,
						body: rest,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [{ type: 'Species', id }],
			}),
			deleteSpecies: builder.mutation<
				{ message: string },
				{ id: string }
			>({
				query: ({ id }) => (
					{
						url: API_ROUTES.SPECIES.DELETE(id),
						method: HTTP_METHOD.DELETE,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [
					{ type: 'Species', id },
					{ type: 'Species', id: 'LIST' },
				],
			}),
		}
	),
})

export const {
	useGetSpeciesQuery,
	useCreateSpeciesMutation,
	useUpdateSpeciesMutation,
	useDeleteSpeciesMutation,
} = speciesApi