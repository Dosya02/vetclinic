export const API_BASE_URL =
	process.env.REACT_APP_API_URL?.replace(/\/$/, '') + '/api'

export const API_ROUTES = {
	AUTH: {
		ME: 'auth/me',
		LOGIN: 'auth/login',
		REGISTER: 'auth/register',
		RESET_PASSWORD: 'auth/reset-password',
		SEND_VERIFICATION_CODE: 'auth/send-verification-code',
		SEND_PASSWORD_RESET_CODE: 'auth/send-password-reset-code',
		VERIFY_EMAIL_CODE: 'auth/verify-email-code',
		VERIFY_PASSWORD_RESET_CODE: 'auth/verify-password-reset-code',
	},
	USER: {
		GET_ALL: 'users',
		VETS: 'users/vets',
	},
	APPOINTMENTS: {
		GET_ALL: 'appointments',
		CREATE: 'appointments',
	},
	SPECIES: {
		GET_ALL: 'species',
		CREATE: 'species',
		UPDATE: (id: string) => `species/${id}`,
		DELETE: (id: string) => `species/${id}`,
	},
	BREEDS: {
		GET_ALL: 'breeds',
		CREATE: 'breeds',
		UPDATE: (id: string) => `breeds/${id}`,
		DELETE: (id: string) => `breeds/${id}`,
	},
	PETS: {
		GET_ALL: 'pets',
		CREATE: 'pets',
		UPDATE: (id: string) => `pets/${id}`,
		DELETE: (id: string) => `pets/${id}`,
	},
	SERVICES: {
		GET_ALL: 'services',
		CREATE: 'services',
		UPDATE: (id: string) => `services/${id}`,
		DELETE: (id: string) => `services/${id}`,
	},
} as const

export const TOKEN_STORAGE_KEY = 'userToken'

export const HTTP_METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
} as const
