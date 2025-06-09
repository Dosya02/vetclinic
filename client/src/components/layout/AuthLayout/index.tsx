import type { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthBgImg } from '@assets/images'
import { Image } from '@components/ui'
import { ROUTES } from '@constants'
import styles from './styles.module.css'

export const AuthLayout: FC = () => (
	<div className={styles.wrapper}>
		<main className={styles.main}>
			<div className={styles.image}>
				<Image
					src={AuthBgImg}
				/>
			</div>
			<div className={styles.content}>
				<Link
					className={styles.link}
					to={ROUTES.HOME}
				>
					← На главную
				</Link>
				<Outlet />
			</div>
		</main>
	</div>
)