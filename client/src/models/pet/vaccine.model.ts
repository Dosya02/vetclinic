/**
 * Вакцина (VaccineModel)
 *
 * Справочная информация о вакцине.
 *
 * Поля:
 * - id: Уникальный идентификатор
 * - name: Название вакцины
 * - description: Описание (опционально)
 * - manufacturer: Производитель (опционально)
 * - speciesIds: Список ID видов животных, для которых подходит вакцина
 */
export interface VaccineModel {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  speciesIds: string[];
}
