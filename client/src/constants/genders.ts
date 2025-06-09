export const GENDERS = {
	MALE: 'male',
	FEMALE: 'female',
} as const

export type GenderType = ValueOf<typeof GENDERS>