import { FC } from "react";
import styles from "./Button.module.css";

interface Props {
	text: string;
	fullWidth?: boolean;
}

export const FormButton: FC<Props> = ({ text, fullWidth = false }) => (
	<button
		className={styles.button}
		style={fullWidth ? { width: "100%" } : { width: "auto" }}
		type="submit"
	>
		{text}
	</button>
);