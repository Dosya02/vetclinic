import type { FC } from 'react'
import { ServicesBannerImg } from '@assets/images'
import { Button, Container, Image } from '@components/ui'
import { useRedirectOrOpenAppointment } from '@hooks'
import styles from './styles.module.css'

export const ServicesBanner: FC = () => {
	const handleClick = useRedirectOrOpenAppointment()

	return (
		<div className={styles.banner}>
			<Container>
				<div className={styles.inner}>
					<div className={styles.content}>
						<h4 className={styles.title}>
							Запишитесь на приём сегодня
						</h4>
						<Button
							text="Записаться"
							onClick={handleClick}
						/>
					</div>
					<div className={styles.image}>
						<Image
							src={ServicesBannerImg}
							alt="services banner"
						/>
					</div>
				</div>
			</Container>
		</div>
	)
}