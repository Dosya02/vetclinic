import { FC } from "react";
import { PawImg } from "../../../assets";
import { Image } from "../../../components";
import styles from "./PetAvatar.module.css";

interface Props {
	imageUrl?: string;
}

export const PetAvatar: FC<Props> = ({ imageUrl }) => (
	<div className={styles.image}>
		<Image src={imageUrl || PawImg} alt="pet avatar" />
	</div>
);