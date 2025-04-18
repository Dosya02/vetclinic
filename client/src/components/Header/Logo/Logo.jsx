import { LogoIcon } from 'src/assets'
import styles from './Logo.module.css'

export const Logo = () => (
	<div className={styles.logo}>
		<img className={styles.image} src={LogoIcon} alt="Logo" />
		<div className={styles.text}>
			<span className={styles.text__top}>Добрый</span>
			<span className={styles.text__bottom}>Доктор Айболит</span>
		</div>
	</div>
)