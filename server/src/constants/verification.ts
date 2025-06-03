export const VERIFICATION_PURPOSES = {
	EMAIL_VERIFICATION: 'email-verification',
	RESET_PASSWORD: 'reset-password',
} as const;

export type VerificationPurpose = (typeof VERIFICATION_PURPOSES)[keyof typeof VERIFICATION_PURPOSES];