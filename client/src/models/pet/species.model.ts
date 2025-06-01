/**
 * Вид животного (SpeciesModel)
 *
 * Например, кошка, собака и т.д.
 *
 * Поля:
 * - id: Уникальный идентификатор вида
 * - name: Название вида
 * - imageUrl: Ссылка на изображение
 */
export interface SpeciesModel {
	id: string;
	name: string;
	imageUrl?: string;
}