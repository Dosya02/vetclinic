import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { PageHeader } from '../Header'
import { PageFooter } from '../Footer'
import styles from './styles.module.css'

export const DefaultLayout: FC = () => (
	<div className={styles.wrapper}>
		<PageHeader />
		<main className={styles.main}>
			<Outlet />
		</main>
		<PageFooter />
	</div>
)