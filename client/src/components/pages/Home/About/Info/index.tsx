import type { FC } from 'react'
import styles from './styles.module.css'

export const AboutInfo: FC = () => (
	<div className={styles.info}>
		<div className={styles.content}>
			<h3 className={styles.title}>
				Нас выбрали более
				{' '}
				<span>1930+</span>
				{' '}
				раз
			</h3>
			<p className={styles.text}>
				Знаем толк в лечении
			</p>
		</div>
	</div>
)