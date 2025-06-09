import type { FC } from 'react'
import { Icon } from '@components/ui'
import { ICONS } from '@constants'
import styles from './styles.module.css'

const features = [
	{
		icon: ICONS.CLOCK,
		text: 'Работаем без выходных',
	},
	{
		icon: ICONS.HEART_PULSE,
		text: 'Проведение самых сложных операций',
	},
	{
		icon: ICONS.MICROSCOPE,
		text: 'Современное оборудование',
	},
]

export const AboutFeatures: FC = () => (
	<div className={styles.features}>
		<ul className={styles.list}>
			{features.map((feature, index) => (
				<li className={styles.item} key={index}>
					<Icon className={styles.icon} name={feature.icon} />
					<p className={styles.text}>
						{feature.text}
					</p>
				</li>
			))}
		</ul>
	</div>
)