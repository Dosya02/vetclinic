export const API_BASE_URL = 'http://localhost:5000/api';

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
  SPECIES: {
    GET_ALL: 'species',
    CREATE: 'species',
    UPDATE: (id: string) => `species/${id}`,
    DELETE: (id: string) => `species/${id}`,
  },
} as const;

export const API_HEADERS = {
  JSON: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const;

export const TOKEN_STORAGE_KEY = 'userToken';

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;