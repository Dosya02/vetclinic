export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    SEND_CODE: 'auth/send-code',
    VERIFY_CODE: 'auth/verify-code',
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
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;