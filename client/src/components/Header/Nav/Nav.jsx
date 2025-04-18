import { NavItem } from './NavItem/NavItem'
import styles from './Nav.module.css'

export const Nav = () => {
	const navItems = [
		{
			to: '/',
			title: 'Главная',
		},
		{
			to: '/about-us',
			title: 'О Нас',
		},
		{
			to: '/team',
			title: 'Врачи',
		},
		{
			to: '/services',
			title: 'Услуги',
		},
	]

	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{navItems.map((navItem) =>
					<NavItem key={navItem.to} to={navItem.to} title={navItem.title} />
				)}
			</ul>
		</nav>
	)
}