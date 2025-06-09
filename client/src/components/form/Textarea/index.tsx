import type { ChangeEvent, FC } from 'react'
import styles from './styles.module.css'

interface TextareaProps {
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
	label?: string
	showLabel?: boolean
	placeholder?: string
	isDisabled?: boolean
}

export const Textarea: FC<TextareaProps> = ({
	value,
	onChange,
	label = '',
	showLabel = false,
	placeholder = '',
	isDisabled = false,
}) => (
	<div className={styles.wrapper}>
		{showLabel &&
			<span className={styles.label}>{label}</span>
		}
		<textarea
			className={styles.textarea}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={isDisabled}
		/>
	</div>
)