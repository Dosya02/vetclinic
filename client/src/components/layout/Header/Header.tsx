import { FC } from "react";
import { Button, Container, Logo } from "../../../components";
import { Nav } from "./Nav/Nav";
import { HeaderActions } from "./Actions/Actions";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { logout } from "../../../store/reducers";

export const Header: FC = () => {
	const { userInfo } = useAppSelector(state => state.authReducer);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	}

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.inner}>
					<Logo variant="light" />
					<Nav />
					{userInfo
						? <Button text="Выйти" onClick={handleLogout} />
						: <HeaderActions />
					}
				</div>
			</Container>
		</header>
	);
}