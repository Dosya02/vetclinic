import { FC } from "react";
import { AuthorizedForm } from "./AuthorizedForm/AuthorizedForm";
import styles from "./AppointmentPage.module.css";
import { AppointmentBgImg } from "../../assets";

export const AppointmentPage: FC = () => {
	return (
		<div
			className={styles.wrapper}
			style={{ backgroundImage: `url(${AppointmentBgImg})` }}
		>
			<AuthorizedForm />
		</div>
	);
}