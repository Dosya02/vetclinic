import { LogoDarkIcon } from 'src/assets'
import styles from './Bottom.module.css'
import { Container } from 'src/components'

export const FooterBottom = () => (
	<div className={styles.bottom}>
		<Container>
			<div className={styles.logo}>
				<img src={LogoDarkIcon} alt="logo-dark" />
			</div>
			<p className={styles.text}>© Все права защищены</p>
		</Container>
	</div>
)