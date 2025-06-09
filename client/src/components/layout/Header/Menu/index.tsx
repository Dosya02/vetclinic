import { useEffect, useRef, type FC, type RefObject } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
	NAV_ITEMS_ADMIN,
	NAV_ITEMS_CLIENT,
	NAV_ITEMS_VET,
	USER_ROLES,
} from '@constants'
import { useAppSelector } from '@hooks'
import { scrollToHashElement } from '@utils/helpers'
import styles from './styles.module.css'

interface HeaderMenuProps {
	isActive: boolean
	closeFn: () => void
	excludeRefs?: RefObject<HTMLElement | null>[]
}

export const HeaderMenu: FC<HeaderMenuProps> = ({
	isActive,
	closeFn,
	excludeRefs = [],
}) => {
	const menuRef = useRef<HTMLDivElement | null>(null)

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

	useEffect(() => {
		if (!isActive) return

		document.body.style.overflow = 'hidden'

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node

			if (menuRef.current?.contains(target)) return

			if (excludeRefs.some(ref => ref.current?.contains(target))) return

			closeFn()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.body.style.overflow = ''
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isActive, closeFn, excludeRefs])

	return (
		<div
			className={clsx(
				styles.menu,
				isActive && styles.active
			)}
			ref={menuRef}
		>
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
		</div>
	)
}