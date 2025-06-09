import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { UserAvatarImg } from '@assets/images'
import { Button, Image } from '@components/ui'
import type { UserModel } from '@models'
import { useRedirectOrOpenAppointment } from '@hooks'
import 'swiper/swiper-bundle.css'
import styles from './styles.module.css'

interface TeamCardProps {
	member: UserModel
}

export const TeamCard: FC<TeamCardProps> = ({ member }) => {
	const { t } = useTranslation()
	const { firstName, lastName, positions, imageUrl } = member
	const handleClick = useRedirectOrOpenAppointment()

	return (
		<article className={styles.card}>
			<div className={styles.image}>
				<Image src={imageUrl ?? UserAvatarImg} />
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>
					{firstName}
					{' '}
					{lastName}
				</h3>
				<p className={styles.text}>
					{positions?.join(', ')}
				</p>
			</div>
			<Button
				text={t('make-an-appointment')}
				onClick={handleClick}
			/>
		</article>
	)
}