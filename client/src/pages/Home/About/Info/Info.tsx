import { FC } from "react";
import styles from "./Info.module.css";

export const AboutInfo: FC = () => (
	<div className={styles.info}>
		<div className={styles.inner}>
			<h3 className={styles.title}>
				Нас выбрали более <span>1930+</span> раз
			</h3>
			<p className={styles.subtitle}>
				Знаем толк в лечении
			</p>
		</div>
	</div>
);