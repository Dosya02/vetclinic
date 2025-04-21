import { FC } from "react";
import styles from "./Button.module.css";

interface Props {
	type?: "default" | "reverse"
	text: string
	onClick: () => void
}

export const Button: FC<Props> = ({ type = "default", text, onClick }) => (
	<button
		className={`
			${styles.button}
			${type !== "default" ? styles.reverse : ""}
		`}
		onClick={onClick}
	>{text}</button>
);