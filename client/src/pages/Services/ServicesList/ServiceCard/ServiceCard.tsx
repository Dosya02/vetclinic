import { FC } from "react";
import styles from "./ServiceCard.module.css";
import { IService } from "../../../../models";
import { Image } from "../../../../components";

interface Props {
	service: IService
}

export const ServiceCard: FC<Props> = ({ service }) => (
	<div className={styles.card}>
		<div className={styles.imageWrapper}>
			{service.image && (
				<Image className={styles.image} src={service.image} alt={service.name} />
			)}
		</div>
		<div className={styles.titleWrapper}>
			<div className={styles.iconWrapper}>
				<Image src={service.icon} alt={service.name} />
			</div>
			<h4 className={styles.title}>
				{service.name}
			</h4>
		</div>
		<div className={styles.textWrapper}>
			<p className={styles.text}>
				{service.description}
			</p>
		</div>
	</div>
)