import { FC } from "react";
import { FooterTop } from "./Top/Top";
import { FooterBottom } from "./Bottom/Bottom";
import styles from "./Footer.module.css";

export const Footer: FC = () => (
	<footer className={styles.footer}>
		<FooterTop />
		<FooterBottom />
	</footer>
);