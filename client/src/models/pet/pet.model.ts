import {
	BreedModel,
	SpeciesModel,
	StructuredDateModel,
	VaccinationRecordModel,
	VisitModel,
} from "@models";

/**
 * Модель питомца (PetModel)
 *
 * Представляет домашнее животное, привязанное к клиенту.
 *
 * Поля:
 * - id: Уникальный идентификатор питомца
 * - name: Имя питомца
 * - species: Вид животного (кошка, собака и т.д.)
 * - breed: Порода животного
 * - birthDate: Дата рождения (структурированная)
 * - features: Особенности (например, аллергии)
 * - imageUrl: Ссылка на изображение питомца
 * - vaccinations: Записи о вакцинации
 * - visits: История визитов к ветеринару
 */
export interface PetModel {
	id: string;
	name: string;
	species: SpeciesModel;
	breed: BreedModel;
	birthDate?: StructuredDateModel;
	features?: string[];
	imageUrl?: string;
	vaccinations?: VaccinationRecordModel[];
	visits?: VisitModel[];
}