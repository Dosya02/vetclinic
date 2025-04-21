import { FC } from "react";
import { Image, NavButton } from "../../../../components";
import { pageConfig } from "../../../../config";
import styles from "./Card.module.css";

interface Props {
	name: string
	image: string
	position: string
}

export const TeamCard: FC<Props> = ({ name, image, position }) => (
	<div className={styles.card}>
		<div className={styles.imageWrapper}>
			<Image className={styles.image} src={image} alt={name} />
		</div>
		<div className={styles.textWrapper}>
			<h3 className={styles.title}>{name}</h3>
			<p className={styles.text}>{position}</p>
		</div>
		<div />
		<div className={styles.buttonWrapper}>
			<NavButton to={pageConfig.appointment} title="Записаться" />
		</div>
	</div>
)