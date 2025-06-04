export const API_PATHS = {
  AUTH: '/api/auth',

  AUTH_ROUTES: {
    ME: '/me',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/reset-password',
    SEND_VERIFICATION_CODE: '/send-verification-code',
    SEND_PASSWORD_RESET_CODE: '/send-password-reset-code',
    VERIFY_EMAIL_CODE: '/verify-email-code',
    VERIFY_PASSWORD_RESET_CODE: '/verify-password-reset-code',
  },
} as const;
