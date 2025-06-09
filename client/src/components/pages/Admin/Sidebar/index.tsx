import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { Logo } from '@components/ui'
import { ADMIN_NAV_ITEMS } from '@constants'
import styles from './styles.module.css'

export const AdminSidebar: FC = () => (
	<aside className={styles.sidebar}>
		<div className={styles.logo}>
			<Logo />
		</div>
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{ADMIN_NAV_ITEMS.map((item) => (
					<li className={styles.item} key={item.href}>
						<NavLink
							className={({ isActive }) => clsx(
								styles.link,
								isActive && styles.active,
							)}
							to={item.href}>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	</aside>
)