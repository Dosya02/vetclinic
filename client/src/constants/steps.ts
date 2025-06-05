export const AUTH_STEP = {
  IDLE: 'idle',
  CODE: 'code',
  EMAIL: 'email',
  PASSWORD: 'password',
} as const;

export type AuthStepType = ValueOf<typeof AUTH_STEP>;