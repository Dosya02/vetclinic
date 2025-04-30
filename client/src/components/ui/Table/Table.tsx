import { TableColumn } from "../../../utils/types";
import styles from "./Table.module.css";

interface Props<T extends object> {
	columns: TableColumn<T>[];
	data: T[];
}

export function Table<T extends object>({ columns, data }: Props<T>) {
	return (
		<div className={styles.wrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index}>{column.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((col, colIdx) => (
								<td key={colIdx}>{String(row[col.key])}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}