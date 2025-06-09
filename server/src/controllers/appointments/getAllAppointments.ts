import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Appointment } from 'models/appointment'

export const getAllAppointments = asyncHandler(async (
	_req: Request,
	res: Response,
) => {
	const appointments = await Appointment.find();

	res.status(200).json({
		message: 'Список всех записей',
		appointments,
	})
})
