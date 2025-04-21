import { FC, MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Item.module.css";

interface Props {
	to: string
	title: string
}

export const NavItem: FC<Props> = ({ to, title }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
		event.preventDefault();

		const [path, hash] = to.split("#");

		if (location.pathname !== path) {
			navigate(path, { state: { scrollTo: hash } });
		} else if (hash) {
			const element = document.getElementById(hash);

			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
	}

	return (
		<li className={styles.item}>
			<a className={styles.link} href={to} onClick={handleClick}>
				{title}
			</a>
		</li>
	);
}