import { Link } from 'react-router-dom'
import styles from './NavButton.module.css'

export const NavButton = ({ text, to }) => (
	<Link className={styles.button} to={to}>
		{text}
	</Link>
)