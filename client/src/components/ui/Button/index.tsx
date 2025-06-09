import type { FC } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface ButtonProps {
	text: string
	type?: 'button' | 'submit'
	className?: string
	onClick?: () => void
	wide?: boolean
	alternate?: boolean
	rounded?: boolean
	disabled?: boolean
}

export const Button: FC<ButtonProps> = ({
	text,
	type = 'button',
	className,
	onClick,
	wide = false,
	alternate = false,
	rounded = true,
	disabled = false,
}) => (
	<button
		className={clsx(
			styles.button,
			className,
			wide && styles.wide,
			alternate && styles.alternate,
			rounded && styles.rounded
		)}
		type={type}
		onClick={onClick}
		disabled={disabled}
	>
		{text}
	</button>
)