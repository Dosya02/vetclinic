import clsx from 'clsx'
import styles from './styles.module.css'

interface RadioProps<T> {
	label: string
	value: T
	name: string
	checked: boolean
	onChange: (value: T) => void
}

export const Radio = <T,>({
	label,
	value,
	name,
	checked,
	onChange,
}: RadioProps<T>) => {
	const handleChange = () => {
		onChange(value)
	}

	return (
		<label className={clsx(styles.radio, checked && styles.checked)}>
			<input
				className={styles.input}
				type="radio"
				name={name}
				checked={checked}
				onChange={handleChange}
			/>
			<span className={styles.mark} />
			{label}
		</label>
	)
}