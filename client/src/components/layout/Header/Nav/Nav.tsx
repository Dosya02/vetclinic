import { FC } from "react";
import { NavItem } from "./Item/Item";
import styles from "./Nav.module.css";

type navItem = {
	to: string
	title: string
}

const navItems: navItem[] = [
	{
		to: "/#intro",
		title: "Главная",
	},
	{
		to: "/#about-us",
		title: "О Нас",
	},
	{
		to: "/#team",
		title: "Врачи",
	},
	{
		to: "/#services",
		title: "Услуги",
	},
]

export const Nav: FC = () => (
	<nav className={styles.nav}>
		<ul className={styles.list}>
			{navItems.map((navItem, index) =>
				<NavItem key={index} to={navItem.to} title={navItem.title} />
			)}
		</ul>
	</nav>
);