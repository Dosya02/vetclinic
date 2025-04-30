import { FC } from "react";
import { Table } from "../../../components";
import { TableColumn } from "../../../utils/types";
import styles from "./PetVaccinations.module.css";

type Vaccine = {
	name: string;
	date: string;
	nextDate: string;
};

const columns = [
	{ key: "name", label: "Вакцина" },
	{ key: "date", label: "Дата" },
	{ key: "nextDate", label: "Следующая" },
] satisfies TableColumn<Vaccine>[];

const data: Vaccine[] = [
	{
		name: "COTIC-25",
		date: "27.03.2025",
		nextDate: "27.03.2026",
	},
];

export const PetVaccinations: FC = () => (
	<div className={styles.wrapper}>
		<h5 className={styles.title}>Вакцинации</h5>
		<Table columns={columns} data={data} />
	</div>
);