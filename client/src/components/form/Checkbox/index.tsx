import type { ChangeEvent, FC } from 'react'
import styles from './styles.module.css'

interface CheckboxProps {
	text: string
	checked: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({
	text,
	checked,
	onChange,
}) => (
	<label className={styles.checkbox}>
		<input
			className={styles.input}
			type="checkbox"
			checked={checked}
			onChange={onChange}
		/>
		<span className={styles.text}>
			{text}
		</span>
	</label>
)