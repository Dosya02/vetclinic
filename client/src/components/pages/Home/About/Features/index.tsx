import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@components/ui'
import { ICONS } from '@constants'
import styles from './styles.module.css'



export const AboutFeatures: FC = () => {
	const { t } = useTranslation()

	const features = [
		{
			icon: ICONS.CLOCK,
			text: t('about-features-1'),
		},
		{
			icon: ICONS.HEART_PULSE,
			text: t('about-features-2'),
		},
		{
			icon: ICONS.MICROSCOPE,
			text: t('about-features-3'),
		},
	]

	return (
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
}