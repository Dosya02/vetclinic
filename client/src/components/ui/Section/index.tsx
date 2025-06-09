import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import type { AnchorType } from '@constants'
import styles from './styles.module.css'

interface SectionProps {
	id?: AnchorType['id']
	alternate?: boolean
	className?: string
	children: ReactNode
}

export const Section: FC<SectionProps> = ({
	id,
	alternate,
	className,
	children
}) => (
	<section
		className={clsx(
			styles.section,
			className,
			alternate && styles.alternate,
		)}
		id={id}
	>
		{children}
	</section>
)