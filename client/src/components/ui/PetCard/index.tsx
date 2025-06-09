import type { FC } from 'react'
import { PetAvatarImg } from '@assets/images'
import { Image } from '@components/ui'
import styles from './styles.module.css'

interface PetCardProps {
	title: string
	imageUrl?: string
}

export const PetCard: FC<PetCardProps> = ({
	title,
	imageUrl,
}) => (
	<article className={styles.card}>
		<Image
			className={styles.image}
			src={imageUrl ?? PetAvatarImg}
			alt="pet image"
		/>
		<h6 className={styles.title}>
			{title}
		</h6>
	</article>
)