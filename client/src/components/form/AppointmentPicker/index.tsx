import { useState, useEffect, type FC } from 'react'

interface AppointmentPickerProps {
	busySlots: string[]
	onSelect: (datetime: string) => void
}

export const AppointmentPicker: FC<AppointmentPickerProps> = ({
	busySlots,
	onTimeSelect,
}) => {
	const [selectedDate, setSelectedDate] = useState<string>('')
	const [availableTimes, setAvailableTimes] = useState<string[]>([])
	const [selectedTime, setSelectedTime] = useState<string>('')

	// Генерация интервала с 8:00 до 18:00 (по часам)
	const generateTimes = (): string[] => {
		const times = []
		for (let hour = 8; hour < 18; hour++) {
			times.push(`${hour.toString().padStart(2, '0')}:00`)
		}
		return times
	}

	// Фильтруем доступные часы на выбранный день
	useEffect(() => {
		if (!selectedDate) {
			setAvailableTimes([])
			setSelectedTime('')
			return
		}

		const times = generateTimes()
		const busyTimesOnDate = busySlots
			.filter(slot => slot.startsWith(selectedDate)) // берем слоты на выбранную дату
			.map(slot => slot.slice(11, 16)) // вытаскиваем время, например "10:00"

		const freeTimes = times.filter(time => !busyTimesOnDate.includes(time))
		setAvailableTimes(freeTimes)
		setSelectedTime('')
	}, [selectedDate, busySlots])

	// Обработчик выбора времени
	const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedTime(e.target.value)
		onTimeSelect(`${selectedDate}T${e.target.value}:00`)
	}

	return (
		<div>
			<label>
				Выберите дату (пн-пт):
				<input
					type="date"
					value={selectedDate}
					onChange={e => setSelectedDate(e.target.value)}
					min={new Date().toISOString().split('T')[0]} // нельзя выбрать дату в прошлом
				/>
			</label>

			{availableTimes.length > 0 ? (
				<label>
					Выберите время:
					<select value={selectedTime} onChange={handleTimeChange}>
						<option value="" disabled>Выберите время</option>
						{availableTimes.map(time => (
							<option key={time} value={time}>{time}</option>
						))}
					</select>
				</label>
			) : selectedDate ? (
				<p>Нет доступных слотов на выбранный день.</p>
			) : null}
		</div>
	)
}
