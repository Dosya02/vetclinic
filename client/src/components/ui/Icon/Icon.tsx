import { FC } from "react";
import Icons from "./sprite.svg";

interface Props {
	name: string;
	className: string;
}

export const Icon: FC<Props> = ({ name, className }) => (
	<svg className={className}>
		<use href={Icons + "#icon-" + name} />
	</svg>
);