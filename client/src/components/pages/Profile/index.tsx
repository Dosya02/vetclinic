import type { FC } from 'react'
import { Container, Section } from '@components/ui'
import { ProfileSidebar } from './Sidebar'
import styles from './styles.module.css'
import { Outlet } from 'react-router-dom'

const ProfilePage: FC = () => (
	<Section className={styles.profile}>
		<Container>
			<div className={styles.inner}>
				<ProfileSidebar />
				<Outlet />
			</div>
		</Container>
	</Section>
)

export default ProfilePage