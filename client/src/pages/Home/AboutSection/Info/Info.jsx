import styles from './Info.module.css'

export const AboutInfo = () => (
	<div className={styles.info}>
		<div className={styles.infoInner}>
			<h3 className={styles.infoTitle}>
				Нас выбрали более <span>1930+</span> раз
			</h3>
			<p className={styles.infoSubtitle}>
				Знаем толк в лечении
			</p>
		</div>
	</div>
)