import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Appointment } from 'models/appointment'
import { User } from 'models/user'

export const createAppointment = asyncHandler(async (
	req: Request,
	res: Response,
) => {
	const {
		fullname,
		petName,
		speciesId,
		serviceId,
		address,
		vetId,
		datetime,
		comment,
		userId,
		petId,
	} = req.body

	const appointmentData: any = {
		serviceId,
		vetId,
		datetime,
		comment,
		address,
	}

	if (userId && petId) {
		// Авторизованный пользователь
		appointmentData.userId = userId
		appointmentData.petId = petId
	} else if (fullname && petName && speciesId) {
		// Гость
		appointmentData.fullname = fullname
		appointmentData.petName = petName
		appointmentData.speciesId = speciesId
	} else {
		res.status(400).json({
			error: 'Неверные данные. Укажите либо userId и petId, либо fullname, petName и speciesId.',
		})
		return
	}

	// Создание приёма
	const appointment = new Appointment(appointmentData)
	await appointment.save()

	// Добавление приёма врачу
	await User.findByIdAndUpdate(vetId, {
		$push: { appointments: appointment._id },
	})

	// Если это авторизованный пользователь — добавить и ему
	if (userId) {
		await User.findByIdAndUpdate(userId, {
			$push: { appointments: appointment._id },
		})
	}

	res.status(201).json({
		message: 'Заявка успешно создана',
		appointment,
	})
})
