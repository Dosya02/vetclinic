import { FC } from "react";
import { Link } from "react-router-dom";
import { pageConfig } from "../../../../config";
import { UserIcon } from "../../../../assets";
import styles from "./Actions.module.css";

export const HeaderActions: FC = () => (
	<div className={styles.actions}>
		<Link to={pageConfig.registration}>
			<img className={styles.userIcon} src={UserIcon} alt="user-icon" />
		</Link>
	</div>
);