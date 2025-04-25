import { FC, ReactNode } from "react";
import styles from "./FormSection.module.css";

interface Props {
	title: string
	subtitle: string
	maxWidth?: string | number
	children: ReactNode
}

export const FormSection: FC<Props> = ({ title, subtitle, maxWidth = "500px", children }) => (
	<section className={styles.section}>
		<h5 className={styles.title}>{title}</h5>
		<p className={styles.subtitle}>{subtitle}</p>
		<div className={styles.content} style={{ maxWidth: maxWidth }}>
			{children}
		</div>
	</section>
);