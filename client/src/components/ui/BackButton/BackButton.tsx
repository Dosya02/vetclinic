import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

interface Props {
	to: string;
	text: string;
	className?: string;
}

export const BackButton: FC<Props> = ({ to, text, className = "" }) => {
	const navigate = useNavigate();

	if (to === "back") {
		return (
			<span
				className={`${styles.link} ${className}`}
				onClick={() => navigate(-1)}
			>
				← {text}
			</span>
		);
	}

	return (
		<Link className={`${styles.link} ${className}`} to={to}>
			← {text}
		</Link>
	);
}