import { Link } from 'react-router-dom'
import styles from './NavItem.module.css'

export const NavItem = ({ to, title }) => (
	<li className={styles.item}>
		<Link className={styles.link} to={to}>{title}</Link>
	</li>
)