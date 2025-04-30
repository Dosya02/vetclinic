import { FC } from "react";
import { NavItem } from "./Item/Item";
import styles from "./Nav.module.css";
import { useTranslation } from "react-i18next";

type navItem = {
	to: string
	title: string
}

const navItems: navItem[] = [
	{
		to: "/#intro",
		title: "nav.main",
	},
	{
		to: "/#about-us",
		title: "nav.aboutUs",
	},
	{
		to: "/#team",
		title: "nav.team",
	},
	{
		to: "/#services",
		title: "nav.services",
	},
]

export const Nav: FC = () => {
	const { t } = useTranslation();

	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{navItems.map((navItem, index) =>
					<NavItem key={index} to={navItem.to} title={t(navItem.title)} />
				)}
			</ul>
		</nav>
	);
}