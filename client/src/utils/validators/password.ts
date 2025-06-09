export const validatePassword = (password: unknown): string | null => {
	if (typeof password !== 'string') {
		return 'Пароль должен быть строкой.'
	}

	if (!password.trim()) {
		return 'Пароль не должен быть пустым.'
	}

	const trimmedPassword = password.trim()

	if (trimmedPassword.length < 8) {
		return 'Пароль должен содержать минимум 8 символов.'
	}

	if (!/[A-Z]/.test(trimmedPassword)) {
		return 'Пароль должен содержать хотя бы одну заглавную букву.'
	}

	if (!/[a-z]/.test(trimmedPassword)) {
		return 'Пароль должен содержать хотя бы одну строчную букву.'
	}

	if (!/[0-9]/.test(trimmedPassword)) {
		return 'Пароль должен содержать хотя бы одну цифру.'
	}

	return null
}