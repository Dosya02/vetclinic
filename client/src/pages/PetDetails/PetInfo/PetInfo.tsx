import { FC } from "react";
import { PetTypes } from "../../../enums";
import styles from "./PetInfo.module.css";

interface Props {
	name: string;
	type: PetTypes;
}

export const PetInfo: FC<Props> = ({ name, type }) => (
	<div className={styles.wrapper}>
		<div className={styles.list}>
			<h5 className={styles.title}>{name}</h5>
			<p className={styles.text}>Вид: {type}</p>
			<p className={styles.text}>Порода: Манчкин</p>
			<p className={styles.text}>Дата рождения: 26.04.2024</p>
		</div>
		<div className={styles.list}>
			<h6 className={styles.subTitle}>Особенности:</h6>
			<p className={styles.text}>Аллергия на курицу</p>
		</div>
	</div>
);