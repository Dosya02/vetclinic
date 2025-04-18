import { HomeBgImg } from 'src/assets'
import { Button, Container } from 'src/components'
import styles from './IntroSection.module.css'

export const IntroSection = () => (
	<section
		className={styles.intro}
		style={{ backgroundImage: `url(${HomeBgImg})` }}
	>
		<Container>
			<div className={styles.content}>
				<h1 className={styles.title}>Вашему любимцу всегда окажут помощь</h1>
				<Button />
			</div>
		</Container>
	</section>
)