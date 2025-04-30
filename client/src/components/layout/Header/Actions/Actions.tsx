import { FC } from "react";
import { Link } from "react-router-dom";
import { pageConfig } from "../../../../config";
import { useAppSelector } from "../../../../hooks";
import { Icon } from "../../../ui";
import { ChangeLanguage } from "./ChangeLanguage/ChangeLanguage";
import { AuthorizedAvatar } from "./AuthorizedAvatar/AuthorizedAvatar";
import styles from "./Actions.module.css";

export const HeaderActions: FC = () => {
	const { userInfo } = useAppSelector(state => state.authReducer);

	return (
		<div className={styles.actions}>
			<ChangeLanguage />
			{userInfo
				? <AuthorizedAvatar />
				: <Link to={pageConfig.login}>
					<Icon className={styles.icon} name="user" />
				</Link>
			}
		</div>
	);
}