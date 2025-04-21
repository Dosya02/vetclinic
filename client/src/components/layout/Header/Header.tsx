import { FC } from "react";
import { Container, Logo } from "../../../components";
import { Nav } from "./Nav/Nav";
import { HeaderActions } from "./Actions/Actions";
import styles from "./Header.module.css";

export const Header: FC = () => (
	<header className={styles.header}>
		<Container>
			<div className={styles.inner}>
				<Logo variant="light" />
				<Nav />
				<HeaderActions />
			</div>
		</Container>
	</header>
);
