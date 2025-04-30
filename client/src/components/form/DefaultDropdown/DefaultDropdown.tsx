import { FC, useEffect, useRef, useState } from "react";
import { Icon } from "../../../components";
import styles from "./DefaultDropdown.module.css";

interface Props {
	placeholder: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
}

export const FormDefaultDropdown: FC<Props> = ({
	placeholder,
	options,
	value,
	onChange,
}) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

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
			<div className={styles.control} onClick={() => setOpen(!open)}>
				{!value && placeholder &&
					<span className={styles.placeholder}>{placeholder}</span>
				}
				{value && <span className={styles.value}>{value}</span>}
				<Icon className={styles.icon} name="arrow-down" />
			</div>
			{open &&
				<ul className={styles.options}>
					{options.map((option, index) => (
						<li
							key={index}
							className={`
								${styles.option}
								${option === value && styles.selected}
							`}
							onClick={() => {
								onChange(option);
								setOpen(false);
							}}
						>
							{option}
						</li>
					))}
				</ul>
			}
		</div>
	);
}