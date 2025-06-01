/**
 * Порода животного (BreedModel)
 *
 * Принадлежит определённому виду.
 *
 * Поля:
 * - id: Уникальный идентификатор породы
 * - name: Название породы
 * - speciesId: ID вида, к которому относится порода
 * - imageUrl: Ссылка на изображение породы
 */
export interface BreedModel {
	id: string;
	name: string;
	speciesId: string;
	imageUrl?: string;
}