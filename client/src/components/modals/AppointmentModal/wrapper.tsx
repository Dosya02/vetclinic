import { AppointmentModal } from './index'
import { useAppointmentModal } from '@hooks'

export const AppointmentModalWrapper = () => {
	const { isOpen, close } = useAppointmentModal()

	return <AppointmentModal isOpen={isOpen} closeFn={close} />
}
