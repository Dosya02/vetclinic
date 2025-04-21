import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";
import styles from "./DefaultLayout.module.css";

export const DefaultLayout: FC = () => (
	<div className={styles.wrapper}>
		<Header />
		<main className={styles.main}>
			<Outlet />
		</main>
		<Footer />
	</div>
);
