import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface Props {
	isActive: boolean
	children: ReactNode
}

export const Modal: FC<Props> = ({ isActive, children }) => (
	<div className={`
		${styles.modal} ${isActive ? styles.active : ""}
	`}>
		{children}
	</div>
);