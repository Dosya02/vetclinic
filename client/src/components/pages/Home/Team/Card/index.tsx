import type { FC } from 'react'
import { UserAvatarImg } from '@assets/images'
import { Button, Image } from '@components/ui'
import type { VetModel } from '@models'
import 'swiper/swiper-bundle.css'
import styles from './styles.module.css'
import { useRedirectOrOpenAppointment } from '@hooks'

interface TeamCardProps {
	member: VetModel
}

export const TeamCard: FC<TeamCardProps> = ({ member }) => {
	const { firstname, lastname, positions, imageUrl } = member
	const handleClick = useRedirectOrOpenAppointment()

	return (
		<article className={styles.card}>
			<div className={styles.image}>
				<Image src={imageUrl ?? UserAvatarImg} />
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>
					{firstname}
					{' '}
					{lastname}
				</h3>
				<p className={styles.text}>
					{positions.join(', ')}
				</p>
			</div>
			<Button
				text="Записаться"
				onClick={handleClick}
			/>
		</article>
	)
}