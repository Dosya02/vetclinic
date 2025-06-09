import { useCallback, useState } from 'react'
import type { StructuredDateModel } from '@models'

const getToday = (): StructuredDateModel => {
	const now = new Date()
	return {
		day: now.getDate(),
		month: now.getMonth() + 1,
		year: now.getFullYear(),
	}
}

export const useStructuredDate = (
	initial: StructuredDateModel = getToday()
) => {
	const [date, setDate] = useState<StructuredDateModel>(initial)

	const set = useCallback((newDate: StructuredDateModel) => {
		setDate(newDate)
	}, [])

	const reset = useCallback(() => {
		setDate(initial)
	}, [initial])

	const toDate = useCallback(() => {
		return new Date(date.year, date.month - 1, date.day)
	}, [date])

	return {
		date,
		set,
		reset,
		toDate,
	}
}
