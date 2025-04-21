import { FC } from "react";
import { Container, Logo } from "../../../../components";
import styles from "./Bottom.module.css";

export const FooterBottom: FC = () => (
	<div className={styles.bottom}>
		<Container>
			<Logo variant="dark" />
			<p className={styles.text}>© Все права защищены</p>
		</Container>
	</div>
)