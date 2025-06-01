import { AddressModel, PetModel } from "@models";

/**
 * Базовая модель пользователя (UserModel)
 *
 * Поля:
 * - id: Уникальный идентификатор пользователя
 * - email: Адрес электронной почты
 * - firstname: Имя пользователя (опционально)
 * - lastname: Фамилия пользователя (опционально)
 * - imageUrl: Фото пользователя (опционально)
 * - role: Роль пользователя (client, vet, admin)
*/
export interface UserModel {
	id: string;
	email: string;
	firstname?: string;
	lastname?: string;
	imageUrl?: string;
	role: UserRole;
}

/**
 * Роль пользователя (UserRole)
 * 
 * Используется для разграничения типов пользователей:
 * - client — обычный пользователь, владелец питомцев
 * - vet — ветеринар, предоставляющий услуги
 * - admin — администратор системы
 */
type UserRole = 'client' | 'vet' | 'admin';

/**
 * Администратор (AdminModel)
 *
 * Пользователь с административными правами.
 * Расширяет UserModel и всегда имеет роль 'admin'.
 */
export interface AdminModel extends UserModel {
	role: 'admin';
}

/**
 * Клиент (ClientModel)
 *
 * Пользователь, владелец домашних животных.
 * Расширяет UserModel и всегда имеет роль 'client'.
 *
 * Дополнительные поля:
 * - pets: Список питомцев пользователя
 * - addresses: список адресов, привязанных к пользователю
 */
export interface ClientModel extends UserModel {
	role: 'client';
	pets: PetModel[];
	addresses: AddressModel[];
}

/**
 * Ветеринар (VetModel)
 *
 * Пользователь, предоставляющий ветеринарные услуги.
 * Расширяет UserModel и всегда имеет роль 'vet'.
 *
 * Дополнительные поля:
 * - services: Список идентификаторов предоставляемых услуг
 */
export interface VetModel extends UserModel {
	role: 'vet';
	services: string[];
}