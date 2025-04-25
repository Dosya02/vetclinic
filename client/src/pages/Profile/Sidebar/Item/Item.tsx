import { FC } from "react";
import { Icon } from "../../../../components";
import styles from "./Item.module.css";

interface Props {
	title: string
	icon: string
	isActive: boolean
	onClick: () => void
}

export const SidebarItem: FC<Props> = ({ title, icon, isActive, onClick }) => (
	<li className={isActive ? `${styles.item} ${styles.active}` : styles.item} onClick={onClick}>
		<div className={styles.line} />
		<Icon name={icon} size="36px" color="#0E2F51" />
		<p className={styles.title}>{title}</p>
	</li>
);