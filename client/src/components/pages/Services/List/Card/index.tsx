import type { FC } from 'react'
import { Image } from '@components/ui'
import type { IconsType } from '@constants'
import styles from './styles.module.css'
import clsx from 'clsx'

interface ServicesListCardProps {
	title: string
	description: string
	icon: string
	imageUrl?: string
}

export const ServicesListCard: FC<ServicesListCardProps> = ({
	title,
	description,
	icon,
	imageUrl,
}) => (
	<article className={styles.card}>
		<div className={clsx(
			styles.image,
			!imageUrl && styles.hideMobile
		)}>
			{imageUrl && <Image src={imageUrl} alt={title} />}
		</div>
		<div className={styles.wrapper}>
			<div className={styles.icon}>
				<Image src={icon} alt={title} />
			</div>
			<h4 className={styles.title}>{title}</h4>
		</div>
		<p className={styles.text}>{description}</p>
	</article>
)