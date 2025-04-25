import { FC } from "react";
import { Container, Logo } from "../../../components";
import styles from "./Footer.module.css";

export const Footer: FC = () => (
	<footer className={styles.footer}>
		<Container>
			<Logo variant="dark" />
			<p className={styles.text}>© Все права защищены</p>
		</Container>
	</footer>
);