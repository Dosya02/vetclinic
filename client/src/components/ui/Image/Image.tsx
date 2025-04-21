import { FC } from "react";
import styles from "./Image.module.css";

interface Props {
	src: string
	alt: string
	className?: string
}

export const Image: FC<Props> = ({ src, alt, className = "" }) => (
	<img className={`${styles.image} ${className}`} src={src} alt={alt} />
);