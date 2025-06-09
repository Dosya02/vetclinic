import type { FC } from 'react'
import { HomeIntroImg } from '@assets/images'
import { Button, Container } from '@components/ui'
import { ANCHORS } from '@constants'
import styles from './styles.module.css'
import { useRedirectOrOpenAppointment } from '@hooks'

export const Intro: FC = () => {
	const handleClick = useRedirectOrOpenAppointment()

	return (
		<section
			className={styles.intro}
			id={ANCHORS.INTRO.id}
			style={{ backgroundImage: `url(${HomeIntroImg})` }}
		>
			<Container>
				<div className={styles.inner}>
					<h1 className={styles.title}>
						Вашему любимцу всегда окажут помощь
					</h1>
					<Button
						text="Записаться"
						onClick={handleClick}
					/>
				</div>
			</Container>
		</section>
	)
}