import { USER_ROLES, type UserRole } from '@constants'

export interface UserModel {
	id: string
	email: string
	firstName?: string
	lastName?: string
	imageUrl?: string
	birthDate?: string
	role: UserRole
	address?: string
	positions?: string[]
	appointments?: string[]
	pets?: string[]
}

export interface ClientModel extends UserModel {
	role: typeof USER_ROLES.CLIENT
}

export interface AdminModel extends UserModel {
	role: typeof USER_ROLES.ADMIN
}

export interface VetModel extends UserModel {
	role: typeof USER_ROLES.VET
}

export type AnyUser = ClientModel | AdminModel | VetModel