import { AboutImg } from 'src/assets'
import { Container, Section, Title } from 'src/components'
import { AboutInfo } from './Info/Info'
import { AboutFeatures } from './Features/Features'
import styles from './AboutSection.module.css'

export const AboutSection = () => (
	<Section className={styles.about} id='about-us'>
		<Container>
			<div className={styles.content}>
				<div className={styles.textContent}>
					<Title
						text='Мы предоставляем лучшие услуги по уходу за домашними животными'
						align='left'
					/>
					<AboutInfo />
					<AboutFeatures />
				</div>
			</div>
		</Container>

		<div className={styles.imageContent}>
			<img src={AboutImg} alt="О нас" />
		</div>
	</Section>
)