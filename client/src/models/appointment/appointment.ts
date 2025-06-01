import { AddressModel, SpeciesModel, StructuredDateTimeModel } from "@models";

/**
 * Базовая модель приёма (AppointmentBaseModel)
 *
 * Общие поля, используемые и в пользовательских, и в гостевых приёмах.
 *
 * Поля:
 * - id: Уникальный идентификатор приёма
 * - dateTime: дата и время записи (структурированная модель с разделением по частям)
 * - serviceId: ID выбранной услуги
 * - vetId: ID выбранного ветеринара
 * - address: адрес, если приём проводится вне клиники (необязательное поле)
 * - comment: дополнительные комментарии клиента (необязательное поле)
 */
export interface AppointmentBaseModel {
	id: string;
	dateTime: StructuredDateTimeModel;
	serviceId: string;
	vetId: string;
	address?: AddressModel;
	comment?: string;
}

/**
 * Приём авторизованного пользователя (AppointmentUserModel)
 *
 * Поля:
 * - clientId: ID зарегистрированного пользователя
 * - petId: ID питомца, выбранного из личного кабинета
 */
export interface AppointmentUserModel extends AppointmentBaseModel {
	clientId: string;
	petId: string;
}

/**
 * Приём неавторизованного пользователя (AppointmentGuestModel)
 *
 * Поля:
 * - guestFullName: ФИО гостя
 * - guestPetName: имя питомца
 * - guestPetSpecies: вид питомца (например, кошка, собака)
 */
export interface AppointmentGuestModel extends AppointmentBaseModel {
	guestFullName: string;
	guestPetName: string;
	guestPetSpecies: SpeciesModel;
}