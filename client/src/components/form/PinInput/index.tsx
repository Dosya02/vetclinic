import styles from "./styles.module.css";

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export const PinInput: React.FC<Props> = ({ value, onChange, onKeyDown, onPaste }) => (
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
	/>
);
