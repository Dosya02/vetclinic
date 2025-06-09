import { api } from './api'
import { API_ROUTES, HTTP_METHOD } from '@constants'
import type { ServiceModel } from '@models'

const mapServicesResponse = (item: {
	_id: string
	name: string
}): ServiceModel => (
	{
		id: item._id,
		name: item.name,
	}
)

export const servicesApi = api.injectEndpoints({
	endpoints: (builder) => (
		{
			getServices: builder.query<
				{ message: string; services: ServiceModel[] },
				void
			>({
				query: () => (
					{
						url: API_ROUTES.SERVICES.GET_ALL,
						method: HTTP_METHOD.GET,
					}
				),
				transformResponse: (response: {
					message: string
					services: { _id: string; name: string }[]
				}) => (
					{
						message: response.message,
						services: response.services.map(mapServicesResponse),
					}
				),
				providesTags: (result) => {
					if (!result) {
						return [{ type: 'Services', id: 'LIST' }]
					}

					const itemTags = result.services.map((s) => (
						{
							type: 'Services' as const,
							id: s.id,
						}
					))

					return [...itemTags, { type: 'Services', id: 'LIST' }]
				},
			}),
			createService: builder.mutation<
				{ message: string; service: ServiceModel },
				{ name: string }
			>({
				query: (body) => (
					{
						url: API_ROUTES.SERVICES.CREATE,
						method: HTTP_METHOD.POST,
						body,
					}
				),
				invalidatesTags: [{ type: 'Services', id: 'LIST' }],
			}),
			updateService: builder.mutation<
				{ message: string; species: ServiceModel },
				{ id: string; name: string }
			>({
				query: ({ id, ...rest }) => (
					{
						url: API_ROUTES.SERVICES.UPDATE(id),
						method: HTTP_METHOD.PUT,
						body: rest,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [{
					type: 'Services', id
				}],
			}),
			deleteService: builder.mutation<
				{ message: string },
				{ id: string }
			>({
				query: ({ id }) => (
					{
						url: API_ROUTES.SERVICES.DELETE(id),
						method: HTTP_METHOD.DELETE,
					}
				),
				invalidatesTags: (_result, _error, { id }) => [
					{ type: 'Services', id },
					{ type: 'Services', id: 'LIST' },
				],
			}),
		}
	),
})

export const {
	useGetServicesQuery,
	useCreateServiceMutation,
	useUpdateServiceMutation,
	useDeleteServiceMutation,
} = servicesApi