import { type FC, useEffect, useMemo, useState } from 'react'
import type { StructuredDateModel } from '@models'
import {
	MONTHS,
	generateYears,
	getDaysInMonth,
} from '@utils/helpers'
import { DropdownField } from './Field'
import styles from './styles.module.css'

interface DateDropdownProps {
	label: string
	onChange: (date: StructuredDateModel) => void
	initialDate?: Date
}

const createOptions = (values: (number | string)[]) =>
	values.map((val, idx) => ({
		id: String(idx),
		name: String(val),
		value: val,
	}))

export const DateDropdown: FC<DateDropdownProps> = ({
	label,
	onChange,
	initialDate,
}) => {
	const currentDate = initialDate ?? new Date()
	const [day, setDay] = useState(currentDate.getDate())
	const [month, setMonth] = useState(currentDate.getMonth())
	const [year, setYear] = useState(currentDate.getFullYear())

	const daysInMonth = getDaysInMonth(month, year)

	const dayOptions = useMemo(
		() => createOptions([...Array(daysInMonth)].map((_, i) => i + 1)),
		[daysInMonth]
	)
	const monthOptions = useMemo(
		() =>
			MONTHS.map((name, idx) => ({
				id: String(idx),
				name,
				value: idx,
			})),
		[]
	)
	const yearOptions = useMemo(
		() => createOptions(generateYears(1950, 2050)), []
	)

	useEffect(() => {
		if (initialDate) {
			setDay(initialDate.getDate())
			setMonth(initialDate.getMonth())
			setYear(initialDate.getFullYear())
		}
	}, [initialDate])

	useEffect(() => {
		if (day > daysInMonth) setDay(daysInMonth)
	}, [day, daysInMonth])

	useEffect(() => {
		onChange({ day, month: month + 1, year })
	}, [day, month, year, onChange])

	return (
		<div className={styles.wrapper}>
			<label className={styles.label}>{label}</label>
			<div className={styles.dropdowns}>
				<DropdownField
					value={day}
					options={dayOptions}
					onSelect={setDay}
				/>
				<DropdownField
					value={month}
					options={monthOptions}
					onSelect={setMonth}
				/>
				<DropdownField
					value={year}
					options={yearOptions}
					onSelect={setYear}
				/>
			</div>
		</div>
	)
}
