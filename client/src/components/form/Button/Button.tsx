import { FC } from "react";
import styles from "./Button.module.css";

interface Props {
	text: string
}

export const FormButton: FC<Props> = ({ text }) => (
	<button className={styles.button} type="submit">
		{text}
	</button>
);