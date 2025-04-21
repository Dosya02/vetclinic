import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Image } from "../../components";
import { AuthBgImg } from "../../assets";
import { pageConfig } from "../../config";
import styles from "./AuthLayout.module.css";

export const AuthLayout: FC = () => {
	return (
		<div className={styles.wrapper}>
			<main className={styles.main}>
				<div className={styles.image}>
					<Image src={AuthBgImg} alt="auth bg image" />
				</div>
				<div className={styles.content}>
					<Link className={styles.link} to={pageConfig.home}>
						← На главную
					</Link>
					<Outlet />
				</div>
			</main>
		</div>
	);
}