import { ValidationResult } from "../types";

export const validatePassword = (password: unknown): ValidationResult => {
	if (typeof password !== "string") {
		return {
			isValid: false,
			message: "Пароль должен быть строкой.",
		}
	}

	if (!password.trim()) {
		return {
			isValid: false,
			message: "Пароль не должен быть пустым.",
		}
	}

	const trimmedPassword = password.trim();

	if (trimmedPassword.length < 8) {
		return {
			isValid: false,
			message: "Пароль должен содержать минимум 8 символов.",
		}
	}

	if (!/[A-Z]/.test(trimmedPassword)) {
		return {
			isValid: false,
			message: "Пароль должен содержать хотя бы одну заглавную букву.",
		}
	}

	if (!/[a-z]/.test(trimmedPassword)) {
		return {
			isValid: false,
			message: "Пароль должен содержать хотя бы одну строчную букву.",
		}
	}

	if (!/[0-9]/.test(trimmedPassword)) {
		return {
			isValid: false,
			message: "Пароль должен содержать хотя бы одну цифру.",
		}
	}

	return {
		isValid: true,
		message: "Пароль валиден.",
	}
}