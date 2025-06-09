export const USER_ROLES = {
	CLIENT: 'client',
	ADMIN: 'admin',
	VET: 'vet',
} as const

export type UserRole = ValueOf<typeof USER_ROLES>