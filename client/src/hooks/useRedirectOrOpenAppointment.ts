import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@constants'
import { useAppSelector, useAppointmentModal } from '@hooks'

export const useRedirectOrOpenAppointment = () => {
	const userInfo = useAppSelector(state => state.authReducer.userInfo)
	const navigate = useNavigate()
	const { open } = useAppointmentModal()

	const redirectOrOpen = () => {
		if (userInfo) {
			navigate(ROUTES.APPOINTMENT)
		} else {
			open()
		}
	}

	return redirectOrOpen
}
