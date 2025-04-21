import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./NavButton.module.css";

interface Props {
	to: string
	title: string
}

export const NavButton: FC<Props> = ({ to, title }) => (
	<Link className={styles.button} to={to}>{title}</Link>
);