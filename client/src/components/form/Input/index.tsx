import type { ChangeEvent, FC } from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface InputProps {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	className?: string
	label?: string
	showLabel?: boolean
	placeholder?: string
	rounded?: boolean
}

export const Input: FC<InputProps> = ({
	value,
	onChange,
	className,
	label = '',
	showLabel = false,
	placeholder = '',
	rounded = false,
}) => (
	<div className={styles.wrapper}>
		<span className={clsx(
			styles.label,
			showLabel && styles.show,
		)}>
			{label}
		</span>
		<input
			className={clsx(
				styles.input,
				className,
				rounded && styles.rounded,
			)}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	</div>
)