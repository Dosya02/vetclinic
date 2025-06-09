export interface AppointmentModel {
	id: string
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
}