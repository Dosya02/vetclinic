import { FC } from "react";
import { ClockIcon, HeartPulseIcon, MicroscopeIcon } from "../../../../assets";
import styles from "./Features.module.css";

const features = [
	{
		icon: ClockIcon,
		text: "Работаем без выходных",
	},
	{
		icon: HeartPulseIcon,
		text: "Проведение самых сложных операций",
	},
	{
		icon: MicroscopeIcon,
		text: "Современное оборудование",
	}
]

export const AboutFeatures: FC = () => (
	<div className={styles.features}>
		{features.map((feature, index) =>
			<div className={styles.item} key={index}>
				<img className={styles.icon} src={feature.icon} alt="feature icon" />
				<p className={styles.text}>{feature.text}</p>
			</div>
		)}
	</div>
);
