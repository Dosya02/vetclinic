import type { FC } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface ImageProps {
	src?: string
	alt?: string
	className?: string
}

export const Image: FC<ImageProps> = ({ src, alt = '', className }) => (
	<img
		className={clsx(styles.image, className)}
		src={src}
		alt={alt}
		loading='lazy'
	/>
)