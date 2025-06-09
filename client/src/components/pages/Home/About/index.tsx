import type { FC } from 'react'
import { HomeAboutImg } from '@assets/images'
import { Container, Image, Section } from '@components/ui'
import { ANCHORS } from '@constants'
import { AboutInfo } from './Info'
import { AboutFeatures } from './Features'
import styles from './styles.module.css'

export const About: FC = () => (
	<Section className={styles.about} id={ANCHORS.ABOUT_US.id}>
		<Container>
			<div className={styles.inner}>
				<div className={styles.content}>
					<h2 className={styles.title}>
						Мы предоставляем лучшие услуги по уходу за домашними животными
					</h2>
					<AboutInfo />
					<AboutFeatures />
				</div>
				<div className={styles.image}>
					<Image
						src={HomeAboutImg}
						alt="about"
					/>
				</div>
			</div>
		</Container>
	</Section>
)