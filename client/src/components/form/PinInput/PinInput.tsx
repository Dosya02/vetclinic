import { ChangeEvent, FC, KeyboardEvent } from "react";
import styles from "./PinInput.module.css";

interface Props {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const FormPinInput: FC<Props> = ({ value, onChange, onKeyDown }) => (
	<input
		className={styles.input}
		type="text"
		maxLength={1}
		inputMode="numeric"
		pattern="\d*"
		value={value}
		onChange={onChange}
		onKeyDown={onKeyDown}
	/>
);
