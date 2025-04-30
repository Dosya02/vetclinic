import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "../../../components";
import { pageConfig } from "../../../config";
import styles from "./SidebarItem.module.css";

interface Props {
	item: {
		title: string;
		link: string;
		icon: string;
	}
}

export const SidebarItem: FC<Props> = ({ item }) => {
	const location = useLocation();
	const fullLink = `${pageConfig.profile}/${item.link}`;
	const isActive = location.pathname.startsWith(fullLink);

	return (
		<li className={`${styles.item} ${isActive ? styles.active : ""}`}>
			<Link className={styles.link} to={item.link}>
				<div className={styles.line} />
				<Icon className={styles.icon} name={item.icon} />
				<h6 className={styles.title}>{item.title}</h6>
			</Link>
		</li>
	);
}