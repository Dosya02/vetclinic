import { Link } from 'react-router-dom'
import { UserIcon } from 'src/assets'
import styles from './HeaderActions.module.css'

export const HeaderActions = () => {
	return (
		<div className={styles.actions}>
			<Link to='/registration'>
				<img className={styles.user__icon} src={UserIcon} alt="user-icon" />
			</Link>
		</div>
	)
}