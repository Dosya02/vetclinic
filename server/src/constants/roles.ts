export const USER_ROLES = {
  CLIENT: 'client',
  ADMIN: 'admin',
  VET: 'vet',
} as const;

export type UserRole = ( typeof USER_ROLES )[keyof typeof USER_ROLES];