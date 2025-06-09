import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeAboutImg } from '@assets/images'
import { Container, Image, Section } from '@components/ui'
import { ANCHORS } from '@constants'
import { AboutInfo } from './Info'
import { AboutFeatures } from './Features'
import styles from './styles.module.css'

export const About: FC = () => {
	const { t } = useTranslation()

	return (
		<Section className={styles.about} id={ANCHORS.ABOUT_US.id}>
			<Container>
				<div className={styles.inner}>
					<div className={styles.content}>
						<h2 className={styles.title}>
							{t('about-title')}
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
}