import { useState } from "react";
import { ErrorMessage, Icon } from "@components";
import { ICONS } from "@constants";
import styles from "./styles.module.css";

interface Props {
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string | null;
	disabled?: boolean;
}

export const PasswordInput: React.FC<Props> = ({
	placeholder,
	value,
	onChange,
	errorMessage,
	disabled = false,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleVisibility = () => setShowPassword((prev) => !prev);

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input
					className={styles.input}
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
				<button
					className={styles.button}
					type="button"
					onClick={toggleVisibility}
					disabled={disabled}
				>
					{showPassword
						? <Icon className={styles.icon} name={ICONS.SHOW_PASSWORD} />
						: <Icon className={styles.icon} name={ICONS.HIDE_PASSWORD} />
					}
				</button>
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</div>
	);
}