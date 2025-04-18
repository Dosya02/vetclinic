import { Footer, Header } from 'src/components'
import { Outlet } from 'react-router-dom';
import styles from './DefaultLayout.module.css'

export const DefaultLayout = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}