export const MONTHS = [
	'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
	'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

export const generateYears = (start: number, end: number): number[] =>
	Array.from({ length: end - start + 1 }, (_, i) => start + i)

export const isLeapYear = (year: number): boolean =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const getDaysInMonth = (month: number, year: number): number => {
	const baseDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	return baseDays[month]
}