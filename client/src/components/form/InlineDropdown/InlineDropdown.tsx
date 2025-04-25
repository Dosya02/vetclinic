import { FC, useEffect, useRef, useState } from "react";
import styles from "./InlineDropdown.module.css";
import { useDropdownContext } from "../../../context";

interface Props {
	id: string;
	label: string;
	placeholder?: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
}

export const FormInlineDropdown: FC<Props> = ({
	id,
	label,
	placeholder = "Выберите",
	options,
	value,
	onChange,
}) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const { openDropdown, setOpenDropdown } = useDropdownContext();

	const isOpen = openDropdown === id;

	useEffect(() => {
		setOpen(isOpen);
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpenDropdown(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [setOpenDropdown]);

	const handleToggle = () => {
		if (isOpen) {
			setOpenDropdown(null);
		} else {
			setOpenDropdown(id);
			setOpen(true);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.control} onClick={handleToggle}>
				<div className={styles.label}>{label}</div>
				{!value && placeholder &&
					<span className={styles.placeholder}>{placeholder}</span>
				}
				{value && <span className={styles.value}>{value}</span>}
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
								setOpenDropdown(null);
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