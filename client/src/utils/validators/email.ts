export const validateEmail = (email: unknown): string | null => {
	if (typeof email !== 'string') {
		return 'E-mail должен быть строкой.'
	}

	if (!email.trim()) {
		return 'E-mail не должен быть пустым.'
	}

	const normalizedEmail = email.trim().toLowerCase()
	const basicEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

	if (!basicEmailRegex.test(normalizedEmail)) {
		return 'E-mail имеет неверный формат.'
	}

	const [localPart, domainPart] = normalizedEmail.split('@')

	if (!localPart || !domainPart) {
		return 'E-mail должен содержать "@".'
	}

	return null
}