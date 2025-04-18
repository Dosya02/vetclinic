import { Link, Outlet } from 'react-router-dom'
import { AuthImage } from 'src/assets'
import { VerificationModal } from 'src/components'
import styles from './AuthLayout.module.css'
import { useState } from 'react'

export const AuthLayout = () => {
	const [modalActive, setModalActive] = useState(false)
	const [email, setEmail] = useState('')

	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				<div className={styles.imageWrapper}>
					<img className={styles.image} src={AuthImage} alt="auth image" />
				</div>
				<div className={styles.content}>
					<Link className={styles.link} to='/'>
						← На главную
					</Link>
					<Outlet context={{ setModalActive, setEmail }} />
				</div>
				<VerificationModal
					active={modalActive}
					setActive={setModalActive}
					email={email}
				/>
			</main>
		</div>
	);
}