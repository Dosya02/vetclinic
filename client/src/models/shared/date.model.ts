/**
 * Структурированная дата (StructuredDateModel)
 * 
 * Используется для хранения даты с отдельными полями.
 * 
 * Поля:
 * - day: день
 * - month: месяц
 * - year: год
 */
export interface StructuredDateModel {
	day: number;
	month: number;
	year: number;
}

/**
 * Структурированная дата с временем (StructuredDateTimeModel)
 * 
 * Используется для хранения даты и времени с отдельными полями.
 * 
 * Поля:
 * - hour: час
 * - minute: минута
 * - second: секунда
 */
export interface StructuredDateTimeModel extends StructuredDateModel {
	hour: number;
	minute: number;
	second: number;
}