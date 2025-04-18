import { AboutImg } from 'src/assets'
import { Container, Title } from 'src/components'
import { AboutInfo } from './Info/Info'
import { AboutFeatures } from './Features/Features'
import styles from './AboutSection.module.css'

export const AboutSection = () => (
	<section className={styles.about}>
		<Container>
			<div className={styles.content}>
				<div className={styles.textContent}>
					<Title text='Мы предоставляем лучшие услуги по уходу за домашними животными' />
					<AboutInfo />
					<AboutFeatures />
				</div>
			</div>
		</Container>

		<div className={styles.imageContent}>
			<img src={AboutImg} alt="О нас" />
		</div>
	</section>
)