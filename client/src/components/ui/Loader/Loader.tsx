import { FC } from "react";
import { LoaderIcon } from "../../../assets";
import { Image } from "../../../components";
import styles from "./Loader.module.css";

export const Loader: FC = () => (
	<div className={styles.wrapper}>
		<div className={styles.loader}>
			<Image src={LoaderIcon} alt="loader" />
		</div>
	</div>
);