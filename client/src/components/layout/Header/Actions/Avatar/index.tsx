import { useState, type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, Icon } from '@components/ui'
import { ICONS, ROUTES, USER_ROLES } from '@constants'
import { useAppSelector, useLogout } from '@hooks'
import styles from './styles.module.css'

export const HeaderActionsAvatar: FC = () => {
	const navigate = useNavigate()
	const userInfo = useAppSelector(state => state.authReducer.userInfo)

	const [isDropdownActive, setDropdownActive] = useState<boolean>(false)

	const { logout } = useLogout()

	const handleLogout = () => {
		logout()
		navigate(ROUTES.LOGIN)
	}

	if (!userInfo) {
		return (
			<Link className={styles.loginLink} to={ROUTES.LOGIN}>
				<Icon className={styles.loginIcon} name={ICONS.USER} />
			</Link>
		)
	}

	return (
		<Dropdown
			direction="right"
			isActive={isDropdownActive}
			closeFn={() => setDropdownActive(false)}
			toggleFn={() => setDropdownActive(prev => !prev)}
			trigger={
				<Avatar
					className={styles.avatar}
					imageUrl={userInfo.imageUrl}
				/>
			}
		>
			<ul className={styles.list}>
				{userInfo.role === USER_ROLES.CLIENT &&
					<li className={styles.item}>
						<Link
							className={`${styles.link} ${styles.profile}`}
							to={ROUTES.PROFILE_ACCOUNT_DETAILS}
							onClick={() => setDropdownActive(false)}
						>
							<Icon
								className={styles.icon}
								name={ICONS.USER}
							/>
							Go to Profile
						</Link>
					</li>
				}
				<li className={styles.item}>
					<div
						className={`${styles.link} ${styles.exit}`}
						onClick={handleLogout}
					>
						<Icon
							className={styles.icon}
							name={ICONS.EXIT}
						/>
						Exit
					</div>
				</li>
			</ul>
		</Dropdown>
	)
}