import type { FC } from 'react'
import clsx from 'clsx'
import { PetAvatarImg, UserAvatarImg } from '@assets/images'
import { Image } from '@components/ui'
import styles from './styles.module.css'

interface AvatarProps {
	type?: 'user' | 'pet'
	className?: string
	imageUrl?: string
}

export const Avatar: FC<AvatarProps> = ({
	type = 'user',
	imageUrl,
	className,
}) => (
	<div className={clsx(styles.avatar, className)}>
		{type === 'user' &&
			<Image
				src={imageUrl ?? UserAvatarImg}
				alt="user avatar"
			/>
		}
		{type === 'pet' &&
			<Image
				src={imageUrl ?? PetAvatarImg}
				alt="pet avatar"
			/>
		}
	</div>
)