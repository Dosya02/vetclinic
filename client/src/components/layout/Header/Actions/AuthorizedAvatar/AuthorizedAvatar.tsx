import { FC, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Icon } from "../../../../../components";
import { pageConfig } from "../../../../../config";
import { useAppDispatch } from "../../../../../hooks";
import { logout } from "../../../../../store/reducers";
import styles from "./AuthorizedAvatar.module.css";

export const AuthorizedAvatar: FC = () => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();
	const handleLogout = () => dispatch(logout());

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper} ref={ref}>
			<div className={styles.avatar} onClick={() => setOpen(!open)}>
				<Avatar size={"50px"} />
			</div>
			{open &&
				<ul className={styles.menu}>
					<NavLink
						className={`${styles.item} ${styles.link}`}
						onClick={() => setOpen(!open)}
						to={`${pageConfig.profile}/${pageConfig.profileAccountDetails}`}
					>
						<Icon
							className={`${styles.icon} ${styles.linkIcon}`}
							name="user"
						/>
						<span className={`${styles.text} ${styles.linkText}`}>
							Go to Profile
						</span>
					</NavLink>
					<div
						className={`${styles.item} ${styles.logout}`}
						onClick={handleLogout}
					>
						<Icon
							className={`${styles.icon} ${styles.logoutIcon}`}
							name="exit"
						/>
						<span className={`${styles.text} ${styles.logoutText}`}>
							Exit
						</span>
					</div>
				</ul>
			}
		</div>
	);
}