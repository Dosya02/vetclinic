export const LOGO_TYPES = {
	LIGHT: 'light',
	DARK: 'dark',
} as const

export type LogoType = ValueOf<typeof LOGO_TYPES>