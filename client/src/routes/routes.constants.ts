const PROFILE_BASE = '/profile';
const PROFILE_PETS_BASE = `${PROFILE_BASE}/pets`;

const ADMIN_BASE = '/admin-panel';
const ADMIN_PETS_BASE = `${ADMIN_BASE}/pets`;

export const APP_ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  APPOINTMENT: '/appointment',

  LOGIN: '/login',
  REGISTRATION: '/registration',

  PROFILE: PROFILE_BASE,
  PROFILE_ACCOUNT_DETAILS: `${PROFILE_BASE}/account-details`,
  PROFILE_PETS: PROFILE_PETS_BASE,
  PROFILE_PET_DETAILS: `${PROFILE_PETS_BASE}/:id`,
  PROFILE_APPOINTMENTS: `${PROFILE_BASE}/appointments`,

  ADMIN: ADMIN_BASE,
  ADMIN_USERS: `${ADMIN_BASE}/users`,
  ADMIN_PETS: ADMIN_PETS_BASE,
  ADMIN_PET_SPECIES: `${ADMIN_PETS_BASE}/species`,
  ADMIN_PET_BREEDS: `${ADMIN_PETS_BASE}/breeds`,
  ADMIN_VACCINES: `${ADMIN_PETS_BASE}/vaccines`,

  VET: '/vet',

  UNAUTHORIZED: '/unauthorized',
} as const;

export type APP_ROUTES = ( typeof APP_ROUTES )[keyof typeof APP_ROUTES];