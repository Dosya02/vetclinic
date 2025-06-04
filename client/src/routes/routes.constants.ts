const PROFILE_BASE = '/profile';
const PROFILE_PETS_BASE = `${PROFILE_BASE}/pets`;

const ADMIN_BASE = '/admin-panel';

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
  ADMIN_CLIENTS: `${ADMIN_BASE}/clients`,
  ADMIN_VETS: `${ADMIN_BASE}/vets`,
  ADMIN_ADMINS: `${ADMIN_BASE}/admins`,
  ADMIN_PETS: `${ADMIN_BASE}/pets`,
  ADMIN_SPECIES: `${ADMIN_BASE}/species`,
  ADMIN_BREEDS: `${ADMIN_BASE}/breeds`,
  ADMIN_VACCINES: `${ADMIN_BASE}/vaccines`,

  VET: '/vet',

  UNAUTHORIZED: '/unauthorized',
} as const;

export type APP_ROUTES = ( typeof APP_ROUTES )[keyof typeof APP_ROUTES];