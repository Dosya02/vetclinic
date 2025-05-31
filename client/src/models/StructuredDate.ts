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