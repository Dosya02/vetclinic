import { useRef, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, Modal } from '@components/ui'
import { ICONS, ROUTES } from '@constants'
import styles from './styles.module.css'

interface AppointmentModalProps {
	isOpen: boolean
	closeFn: () => void
}

export const AppointmentModal: FC<AppointmentModalProps> = ({
	isOpen,
	closeFn,
}) => {
	const ref = useRef<HTMLDivElement | null>(null)
	const navigate = useNavigate()

	return (
		<Modal isOpen={isOpen} closeFn={closeFn} ref={ref}>
			<div className={styles.content}>
				<h3 className={styles.title}>
					Как вы хотите записаться?
				</h3>
				<div className={styles.cards}>
					<div
						className={styles.card}
						onClick={() => {
							navigate(ROUTES.APPOINTMENT)
							closeFn()
						}}
					>
						<Icon className={styles.icon} name={ICONS.USER_ALT} />
						<h4 className={styles.caption}>
							Как гость
						</h4>
						<p className={styles.text}>
							Записаться без входа в личный кабинет
						</p>
					</div>
					<div
						className={styles.card}
						onClick={() => {
							navigate(ROUTES.LOGIN)
							closeFn()
						}}
					>
						<Icon className={styles.icon} name={ICONS.DOG} />
						<h4 className={styles.caption}>
							Из личного кабинета
						</h4>
						<p className={styles.text}>
							Выбрать питомца и быстро записаться
						</p>
					</div>
				</div>
			</div>
		</Modal>
	)
}