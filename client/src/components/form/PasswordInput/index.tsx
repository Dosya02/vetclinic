import type { ChangeEvent, FC } from 'react'
import clsx from 'clsx'
import { Icon } from '@components/ui'
import { ICONS } from '@constants'
import { useBoolean } from '@hooks'
import styles from './styles.module.css'

interface PasswordInputProps {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	className?: string
	label?: string
	showLabel?: boolean
	placeholder?: string
	rounded?: boolean
}

export const PasswordInput: FC<PasswordInputProps> = ({
	value,
	onChange,
	className = '',
	label = '',
	showLabel = false,
	placeholder = '',
	rounded = false,
}) => {
	const { value: showPassword, toggle } = useBoolean(false)

	return (
		<div className={styles.wrapper}>
			<label className={clsx(
				styles.label,
				showLabel && styles.show,
			)}>
				{label}
			</label>
			<div className={styles.content}>
				<input
					className={clsx(
						styles.input,
						className,
						rounded && styles.rounded,
					)}
					type={showPassword ? 'text' : 'password'}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<button
					className={styles.toggler}
					type="button"
					onClick={toggle}
				>
					{showPassword
						? <Icon className={styles.icon} name={ICONS.SHOW_PASSWORD} />
						: <Icon className={styles.icon} name={ICONS.HIDE_PASSWORD} />
					}
				</button>
			</div>
		</div>
	)
}