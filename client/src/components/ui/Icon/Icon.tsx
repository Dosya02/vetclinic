import { FC } from "react";
import styles from "./Icon.module.css";
import Icons from "./sprite.svg";

interface Props {
	name: string
	size?: string | number
	color?: string
}

export const Icon: FC<Props> = ({ name, size = "auto", color }) => (
	<svg
		className={styles.icon}
		width={size}
		height={size}
		fill={color}
	>
		<use href={Icons + "#icon-" + name} />
	</svg>
);