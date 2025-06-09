export const STEPS = {
	IDLE: 'idle',
	CODE: 'code',
	EMAIL: 'email',
	PASSWORD: 'password',
} as const

export type StepType = ValueOf<typeof STEPS>