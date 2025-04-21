import { FC, ReactNode } from "react";
import styles from "./Section.module.css";

interface Props {
	children: ReactNode
	className?: string
	id?: string
}

export const Section: FC<Props> = ({ children, className = "", id }) => (
	<section className={`${styles.section} ${className}`} id={id}>
		{children}
	</section>
)