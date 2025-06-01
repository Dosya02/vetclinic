import { StructuredDateModel } from 'models/shared/date.model';

/**
 * Запись о вакцинации (VaccinationRecordModel)
 *
 * Информация о проведённой вакцинации животного.
 *
 * Поля:
 * - id: Уникальный ID записи
 * - vaccineId: ID вакцины
 * - date: Дата вакцинации
 * - nextDate: Планируемая следующая дата (опционально)
 * - notes: Комментарии или дополнительные сведения
 */
export interface VaccinationRecordModel {
	id: string;
	vaccineId: string;
	date: StructuredDateModel;
	nextDate?: StructuredDateModel;
	notes?: string;
}
