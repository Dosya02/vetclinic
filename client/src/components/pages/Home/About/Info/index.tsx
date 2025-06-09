import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

export const AboutInfo: FC = () => {
	const { t } = useTranslation()

	return (
		<div className={styles.info}>
			<div className={styles.content}>
				<h3 className={styles.title}>
					{t('about-info-title-start')}
					{' '}
					<span>1930+</span>
					{' '}
					{t('about-info-title-end')}
				</h3>
				<p className={styles.text}>
					{t('about-info-text')}
				</p>
			</div>
		</div>
	)
}