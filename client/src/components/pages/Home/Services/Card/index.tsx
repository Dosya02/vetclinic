import type { FC } from 'react'
import { Icon } from '@components/ui'
import type { IconsType } from '@constants'
import styles from './styles.module.css'

interface ServicesCardProps {
	name: string
	icon: IconsType
	description: string
}

export const ServicesCard: FC<ServicesCardProps> = ({
	name,
	icon,
	description,
}) => (
	<article className={styles.card}>
		<Icon className={styles.icon} name={icon} />
		<div className={styles.content}>
			<h4 className={styles.title}>
				{name}
			</h4>
			<p className={styles.text}>
				{description}
			</p>
		</div>
	</article>
)