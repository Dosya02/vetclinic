import { useLocation, useNavigate } from 'react-router-dom'
import styles from './NavItem.module.css'

export const NavItem = ({ to, title }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = (e) => {
		e.preventDefault()

		const [path, hash] = to.split('#')

		if (location.pathname !== path) {
			navigate(path, { state: { scrollTo: hash } })
		} else if (hash) {
			const element = document.getElementById(hash)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
		}
	}

	return (
		<li className={styles.item}>
			<a className={styles.link} href={to} onClick={handleClick}>
				{title}
			</a>
		</li>
	)
}