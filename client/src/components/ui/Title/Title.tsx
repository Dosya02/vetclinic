import { FC } from "react";
import styles from "./Title.module.css";

interface Props {
	text: string
	align?: "left" | "center" | "right" | "justify" | "start" | "end"
}

export const Title: FC<Props> = ({ text, align = "center" }) => (
	<h2 className={styles.title} style={{ textAlign: align }}>{text}</h2>
);