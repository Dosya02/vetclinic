import { ChangeEvent, FC } from "react";
import { ErrorMessage } from "../../../components";
import styles from "./Input.module.css";

interface Props {
	placeholder: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	errorMessage: string
	disabled?: boolean
}

export const FormInput: FC<Props> = ({
	placeholder,
	value = "",
	onChange,
	errorMessage,
	disabled = false,
}) => (
	<div className={styles.wrapper}>
		<input
			className={styles.input}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			disabled={disabled}
		/>
		{errorMessage && <ErrorMessage message={errorMessage} />}
	</div>
);