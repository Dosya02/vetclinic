import { StructuredDateModel } from 'models/StructuredDate';

/**
 * Визит к ветеринару (VisitModel)
 *
 * История визитов питомца.
 *
 * Поля:
 * - date: Дата визита
 * - reason: Причина визита (например, осмотр, стоматология)
 * - comment: Комментарий (опционально)
 */
export interface VisitModel {
	date: StructuredDateModel;
	reason: string;
	comment?: string;
}