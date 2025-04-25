import { FC, useEffect, useRef, useState } from "react";
import { Icon } from "../../../components";
import styles from "./ImageDropdown.module.css";
import { NoImageImg } from "../../../assets";

type ItemType = {
	name?: string;
	imageUrl?: string;
}

interface Props {
	placeholder: string;
	options: ItemType[];
	value: ItemType;
	onChange: (value: ItemType) => void;
}

export const FormImageDropdown: FC<Props> = ({
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
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.control} onClick={() => setOpen(!open)}>
				{value?.name ? (
					<div className={styles.value}>
						<img
							className={styles.image}
							src={value.imageUrl || NoImageImg}
							alt={value.name}
						/>
						<span className={styles.text}>{value.name}</span>
					</div>
				) : (
					<span className={styles.placeholder}>{placeholder}</span>
				)}
				<Icon name="arrow-down" size={30} color="#0E2F51" />
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
							<div className={styles.value}>
								<img
									className={styles.image}
									src={option.imageUrl || NoImageImg}
									alt={option.name}
								/>
								<span className={styles.text}>{option.name}</span>
							</div>
						</li>
					))}
				</ul>
			}
		</div>
	);
}