import { FC } from "react";
import { AvatarImg } from "../../../assets";
import { useAppSelector } from "../../../hooks";
import styles from "./Avatar.module.css";

interface Props {
	size?: string | number
	border?: boolean
}

export const Avatar: FC<Props> = ({ size = "auto", border = false }) => {
	const { userInfo } = useAppSelector(state => state.authReducer);

	const avatarSrc = userInfo?.avatar || AvatarImg;

	return (
		<img
			className={styles.avatar}
			style={border ? { borderColor: "#0E2F51" } : { borderColor: "transparent" }}
			src={avatarSrc}
			width={size}
			height={size}
			alt="avatar"
		/>
	);
}