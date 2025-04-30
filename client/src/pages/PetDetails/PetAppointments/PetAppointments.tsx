import { FC } from "react";
import { Table } from "../../../components";
import { TableColumn } from "../../../utils/types";
import styles from "./PetAppointments.module.css";

type Person = {
	date: string;
	reason: string;
	comment: string;
};

const columns = [
	{ key: "date", label: "Дата визита" },
	{ key: "reason", label: "Причина" },
	{ key: "comment", label: "Комментарий" },
] satisfies TableColumn<Person>[];

const data: Person[] = [
	{
		date: "21.03.2025",
		reason: "Осмотр",
		comment: "Всё в порядке",
	},
	{
		date: "22.03.2025",
		reason: "Стоматология",
		comment: "Не давать твердую пищу пару дней",
	},
];

export const PetAppointments: FC = () => (
	<div className={styles.wrapper}>
		<h5 className={styles.title}>История визитов</h5>
		<Table columns={columns} data={data} />
	</div>
);