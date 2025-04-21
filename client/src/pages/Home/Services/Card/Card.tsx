import { FC } from "react";
import { Image } from "../../../../components";
import styles from "./Card.module.css";

interface Props {
	name: string
	image: string
	description: string
}

export const ServiceCard: FC<Props> = ({ name, image, description }) => (
	<div className={styles.card}>
		<div className={styles.image}>
			<Image src={image} alt={name} />
		</div>
		<h4 className={styles.title}>{name}</h4>
		<div />
		<p className={styles.text}>{description}</p>
	</div>
)