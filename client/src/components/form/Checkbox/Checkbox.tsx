import { ChangeEvent, FC } from "react";
import { ErrorMessage } from "../../../components";
import styles from "./Checkbox.module.css";

interface Props {
	text: string
	checked: boolean
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	errorMessage?: string;
}

export const FormCheckbox: FC<Props> = ({ text, checked, onChange, errorMessage }) => (
	<div className={styles.wrapper}>
		<label className={styles.label}>
			<input
				className={styles.checkbox}
				type="checkbox"
				checked={checked}
				onChange={onChange}
			/>
			<span className={styles.text}>{text}</span>
		</label>
		{errorMessage && <ErrorMessage message={errorMessage} />}
	</div>
);