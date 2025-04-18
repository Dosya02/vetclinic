import { Container, NavButton } from 'src/components'
import { HomeBgImg } from 'src/assets'
import styles from './IntroSection.module.css'

export const IntroSection = () => (
	<section
		className={styles.intro}
		style={{ backgroundImage: `url(${HomeBgImg})` }}
		id='intro'
	>
		<Container>
			<div className={styles.content}>
				<h1 className={styles.title}>Вашему любимцу всегда окажут помощь</h1>
				<div className={styles.buttonContainer}>
					<NavButton text='Записаться' to='/appointment' />
				</div>
			</div>
		</Container>
	</section>
)