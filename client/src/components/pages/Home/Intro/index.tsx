import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { HomeIntroImg } from '@assets/images'
import { Button, Container } from '@components/ui'
import { ANCHORS } from '@constants'
import { useRedirectOrOpenAppointment } from '@hooks'
import styles from './styles.module.css'

export const Intro: FC = () => {
	const handleClick = useRedirectOrOpenAppointment()
	const { t } = useTranslation();

	return (
		<section
			className={styles.intro}
			id={ANCHORS.INTRO.id}
			style={{ backgroundImage: `url(${HomeIntroImg})` }}
		>
			<Container>
				<div className={styles.inner}>
					<h1 className={styles.title}>
						{t('home-intro')}
					</h1>
					<Button
						text={t('make-an-appointment')}
						onClick={handleClick}
					/>
				</div>
			</Container>
		</section>
	)
}