import { ChangeEvent, FC, useState } from "react";
import { PasswordHideIcon, PasswordShowIcon } from "../../../assets";
import { ErrorMessage, Image } from "../../../components";
import styles from "./PasswordInput.module.css";

interface Props {
	placeholder: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
}

export const FormPasswordInput: FC<Props> = ({
	placeholder,
	value = "",
	onChange,
	errorMessage,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputWrapper}>
				<input
					className={styles.input}
					type={showPassword ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<button
					className={styles.button}
					type="button"
					onClick={toggleVisibility}
				>
					{showPassword
						? <Image src={PasswordShowIcon} alt="show password" />
						: <Image src={PasswordHideIcon} alt="hide password" />
					}
				</button>
			</div>
			{errorMessage && <ErrorMessage message={errorMessage} />}
		</div>
	);
}