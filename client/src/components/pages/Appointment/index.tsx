import type { FC } from 'react'
import { AppointmentBgImg } from '@assets/images'
import { useAppSelector } from '@hooks'
import { GuestForm } from './GuestForm'
import styles from './styles.module.css'

const AppointmentPage: FC = () => {
	const userInfo = useAppSelector(state => state.authReducer.userInfo)

	return (
		<section
			className={styles.wrapper}
			style={{ backgroundImage: `url(${AppointmentBgImg})` }}
		>
			<div className={styles.inner}>
				<h2 className={styles.title}>
					Записаться на прием
				</h2>
				{userInfo ? <p>user form</p> : <GuestForm />}
			</div>
		</section>
	)
}

export default AppointmentPage