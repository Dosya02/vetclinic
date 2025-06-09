import {
	forwardRef,
	type ChangeEvent,
	type ClipboardEvent,
	type ForwardedRef,
	type KeyboardEvent,
} from 'react'
import styles from './styles.module.css'

interface PinInputProps {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
	onPaste: (e: ClipboardEvent<HTMLInputElement>) => void
}

export const PinInput = forwardRef<HTMLInputElement, PinInputProps>(
	({
		value,
		onChange,
		onKeyDown,
		onPaste,
	}, ref: ForwardedRef<HTMLInputElement>) => (
		<input
			className={styles.input}
			type="text"
			maxLength={1}
			inputMode="numeric"
			pattern="\d*"
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onPaste={onPaste}
			ref={ref}
		/>
	)
)

PinInput.displayName = 'PinInput'