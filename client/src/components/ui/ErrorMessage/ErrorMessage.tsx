import { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface Props {
	message: string
}

export const ErrorMessage: FC<Props> = ({ message }) => (
	<span className={styles.error}>{message}</span>
);