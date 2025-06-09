import { Router } from 'express'
import { API_PATHS } from 'constants/paths'
import {
	createAppointment,
	getAllAppointments,
} from 'controllers/appointments'

const appointmentsRouter = Router()

appointmentsRouter.get(API_PATHS.APPOINTMENTS_ROUTES.GET_ALL, getAllAppointments)
appointmentsRouter.post(API_PATHS.APPOINTMENTS_ROUTES.CREATE, createAppointment)

export { appointmentsRouter }