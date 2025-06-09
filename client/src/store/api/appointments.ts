import { API_ROUTES, HTTP_METHOD } from '@constants'
import { api } from './api'
import type { AppointmentModel } from '@models'

const mapAppointmentResponse = (item: {
	_id: string
	userId?: string
	petId?: string
	fullname?: string
	petName?: string
	speciesId?: string
	serviceId: string
	vetId: string
	address?: string
	datetime: string
	comment?: string
}): AppointmentModel => ({
	id: item._id,
	userId: item.userId,
	petId: item.petId,
	fullname: item.fullname,
	petName: item.petName,
	speciesId: item.speciesId,
	serviceId: item.serviceId,
	vetId: item.vetId,
	address: item.address,
	datetime: item.datetime,
	comment: item.comment,
})

export const appointmentsApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllAppointments: builder.query<
			{ message: string, appointments: AppointmentModel[] },
			void
		>({
			query: () => ({
				url: API_ROUTES.APPOINTMENTS.GET_ALL,
				method: HTTP_METHOD.GET,
			}),
			transformResponse: (response: {
				message: string
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				appointments: any[]
			}) => (
				{
					message: response.message,
					appointments: response.appointments.map(mapAppointmentResponse),
				}
			),
			providesTags: (result) =>
				result
					? [
						...result.appointments.map((a) => ({
							type: 'Appointments' as const,
							id: a.id,
						})),
						{ type: 'Appointments', id: 'LIST' },
					]
					: [{ type: 'Appointments', id: 'LIST' }],
		}),
		createAppointment: builder.mutation<
			{ message: string, appointment: AppointmentModel },
			FormData
		>({
			query: (body) => ({
				url: API_ROUTES.APPOINTMENTS.CREATE,
				method: HTTP_METHOD.POST,
				body,
			}),
			invalidatesTags: [{ type: 'Appointments', id: 'LIST' }],
		}),
	})
})

export const {
	useGetAllAppointmentsQuery,
	useCreateAppointmentMutation,
} = appointmentsApi