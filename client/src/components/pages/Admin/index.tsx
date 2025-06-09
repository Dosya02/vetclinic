import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './Sidebar'
import styles from './styles.module.css'

const AdminPage = () => (
	<div className={styles.wrapper}>
		<AdminSidebar />
		<main className={styles.main}>
			<Outlet />
		</main>
	</div>
)

export default AdminPage