import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	NAV_ITEMS_ADMIN,
	NAV_ITEMS_CLIENT,
	NAV_ITEMS_VET,
	USER_ROLES,
} from '@constants'
import { useAppSelector } from '@hooks'
import { scrollToHashElement } from '@utils/helpers'
import styles from './styles.module.css'

export const HeaderNav: FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const { userInfo } = useAppSelector(state => state.authReducer)

	const role = userInfo?.role || USER_ROLES.CLIENT
	const isAdmin = role === USER_ROLES.ADMIN
	const isVet = role === USER_ROLES.VET

	const navItems = {
		[USER_ROLES.CLIENT]: NAV_ITEMS_CLIENT,
		[USER_ROLES.ADMIN]: NAV_ITEMS_ADMIN,
		[USER_ROLES.VET]: NAV_ITEMS_VET,
	}[role] ?? NAV_ITEMS_CLIENT

	const handleClick = (item: { id: string; label: string; href?: string }) => {
		if ((isAdmin || isVet) && item.href) {
			navigate(item.href)
			return
		}

		scrollToHashElement(item.id, navigate, location)
	}

	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{navItems.map((item) => (
					<li
						key={item.id}
						className={styles.item}
						onClick={() => handleClick(item)}
					>
						<span className={styles.text}>
							{item.label}
						</span>
					</li>
				))}
			</ul>
		</nav>
	)
}