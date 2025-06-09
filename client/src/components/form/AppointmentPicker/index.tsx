import { useState, useEffect, type FC } from 'react'
import DatePicker from 'react-datepicker'
import { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './styles.module.css'

registerLocale('ru', ru)

interface AppointmentPickerProps {
	busySlots: string[]
	onSelect: (datetime: string) => void
}

export const AppointmentPicker: FC<AppointmentPickerProps> = ({
	busySlots,
	onSelect,
}) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [availableTimes, setAvailableTimes] = useState<string[]>([])
	const [selectedTime, setSelectedTime] = useState<string>('')

	const generateTimes = (): string[] => {
		const times = []
		for (let hour = 8; hour < 18; hour++) {
			times.push(`${hour.toString().padStart(2, '0')}:00`)
		}
		return times
	}

	useEffect(() => {
		if (!selectedDate) {
			setAvailableTimes([])
			setSelectedTime('')
			onSelect('')
			return
		}

		const dateStr = selectedDate.toISOString().split('T')[0]

		const times = generateTimes()
		const busyTimesOnDate = busySlots
			.filter(slot => slot.startsWith(dateStr))
			.map(slot => slot.slice(11, 16))

		const freeTimes = times.filter(time => !busyTimesOnDate.includes(time))
		setAvailableTimes(freeTimes)

		if (!selectedTime && freeTimes.length > 0) {
			const firstTime = freeTimes[0]
			setSelectedTime(firstTime)
			onSelect(`${dateStr}T${firstTime}:00`)
		}

		if (freeTimes.length === 0) {
			setSelectedTime('')
			onSelect('')
		}
	}, [selectedDate, busySlots, onSelect, selectedTime])

	const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (!selectedDate) return
		setSelectedTime(e.target.value)
		const dateStr = selectedDate.toISOString().split('T')[0]
		onSelect(`${dateStr}T${e.target.value}:00`)
	}

	const isWeekday = (date: Date) => {
		const day = date.getDay()
		return day !== 0 && day !== 6
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.field}>
				<span className={styles.label}>
					Дата
				</span>
				<DatePicker
					className={styles.input}
					selected={selectedDate}
					onChange={date => setSelectedDate(date)}
					filterDate={isWeekday}
					locale="ru"
					dateFormat="dd.MM.yyyy"
					minDate={new Date()}
					placeholderText="Выберите дату"
				/>
			</div>
			<div className={styles.field}>
				<span className={styles.label}>
					Время
				</span>
				<select
					className={styles.input}
					value={selectedTime}
					onChange={handleTimeChange}
					disabled={!selectedDate || availableTimes.length === 0}
				>
					<option className={styles.option} value="" disabled>
						{!selectedDate
							? 'Сначала выберите дату'
							: availableTimes.length === 0
								? 'Нет доступных времён'
								: 'Выберите время'}
					</option>
					{availableTimes.map(time => (
						<option
							className={styles.option}
							value={time}
							key={time}
						>
							{time}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
