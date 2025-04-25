import { FC } from "react";
import styles from "./Heading.module.css";
import { Avatar } from "../../../../components";

export const Heading: FC = () => {
	return (
		<div className={styles.heading}>
			<div className={styles.avatarWrapper}>
				<Avatar size="150px" border />
				<span className={styles.avatarText}>
					Изменить фото
				</span>
			</div>
			<div className={styles.titleWrapper}>
				<h4 className={styles.title}>Личная информация</h4>
				<p className={styles.subtitle}>Привет, Пользователь</p>
			</div>
		</div>
	);
}