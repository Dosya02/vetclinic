const PROFILE_BASE = '/profile'
const PROFILE_PETS_BASE = `${PROFILE_BASE}/pets`
const ADMIN_BASE = '/admin-panel'

export const ROUTES = {
	HOME: '/',
	SERVICES: '/services',
	APPOINTMENT: '/make-an-appointment',

	LOGIN: '/login',
	REGISTRATION: '/registration',

	PROFILE: PROFILE_BASE,
	PROFILE_ACCOUNT_DETAILS: `${PROFILE_BASE}/account-details`,
	PROFILE_PETS: PROFILE_PETS_BASE,
	PROFILE_PET_DETAILS: `${PROFILE_PETS_BASE}/:id`,
	PROFILE_APPOINTMENTS: `${PROFILE_BASE}/appointments`,

	VET_APPOINTMENTS: '/appointments',

	ADMIN: ADMIN_BASE,
	ADMIN_SPECIES: `${ADMIN_BASE}/species`,
	ADMIN_BREEDS: `${ADMIN_BASE}/breeds`,
	ADMIN_SERVICES: `${ADMIN_BASE}/services`,
	ADMIN_VETS: `${ADMIN_BASE}/vets`,

	UNAUTHORIZED: '/unauthorized',
} as const

export type RoutesType = (typeof ROUTES)[keyof typeof ROUTES]