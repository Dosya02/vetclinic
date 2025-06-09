import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Icon } from '@components/ui'
import { ICONS, ROUTES } from '@constants'
import styles from './styles.module.css'

const sidebarItems = [
	{
		title: 'Личный кабинет',
		link: ROUTES.PROFILE_ACCOUNT_DETAILS,
		icon: ICONS.USER,
	},
	{
		title: 'Карта питомца',
		link: ROUTES.PROFILE_PETS,
		icon: ICONS.PET_CARD,
	},
	{
		title: 'Записи',
		link: ROUTES.PROFILE_APPOINTMENTS,
		icon: ICONS.MEDICAL_RECEIPT,
	},
]

export const ProfileSidebar: FC = () => (
	<aside className={styles.sidebar}>
		<ul className={styles.list}>
			{sidebarItems.map((item) =>
				<li className={styles.item} key={item.link}>
					<NavLink
						className={({ isActive }) => clsx(
							styles.link,
							isActive && styles.active,
						)}
						to={item.link}
					>
						<div className={styles.line} />
						<Icon className={styles.icon} name={item.icon} />
						<h6 className={styles.title}>
							{item.title}
						</h6>
					</NavLink>
				</li>
			)}
		</ul>
	</aside>
)