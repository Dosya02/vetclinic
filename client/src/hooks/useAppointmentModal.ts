import { useContext } from 'react'
import { AppointmentModalContext } from '@context/appointment/context'

export const useAppointmentModal = () => {
	const context = useContext(AppointmentModalContext)
	if (!context) {
		throw new Error('useAppointmentModal must be used within AppointmentModalProvider')
	}
	return context
}