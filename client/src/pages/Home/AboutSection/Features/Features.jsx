import { ClockIcon, MicroscopeIcon, HeartPulseIcon } from 'src/assets'
import styles from './Features.module.css'

export const AboutFeatures = () => {
	const features = [
		{
			icon: ClockIcon,
			text: 'Работаем без выходных',
		},
		{
			icon: HeartPulseIcon,
			text: 'Проведение самых сложных операций',
		},
		{
			icon: MicroscopeIcon,
			text: 'Современное оборудование',
		}
	]

	return (
		<div className={styles.features}>
			{features.map((feature, index) =>
				<div className={styles.featureItem} key={index}>
					<img src={feature.icon} alt="" className={styles.featureIcon} />
					<p className={styles.featureText}>
						{feature.text}
					</p>
				</div>
			)}
		</div>
	);
}