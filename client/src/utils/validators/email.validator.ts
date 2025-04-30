import { ValidationResult } from "../types";

export const validateEmail = (email: unknown): ValidationResult => {
	if (typeof email !== "string") {
		return {
			isValid: false,
			message: "Email должен быть строкой.",
		}
	}

	if (!email.trim()) {
		return {
			isValid: false,
			message: "Email не должен быть пустым.",
		}
	}

	const normalizedEmail = email.trim().toLowerCase();
	const basicEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	if (!basicEmailRegex.test(normalizedEmail)) {
		return {
			isValid: false,
			message: "Email имеет неверный формат.",
		}
	}

	const [localPart, domainPart] = normalizedEmail.split("@");

	if (!localPart || !domainPart) {
		return {
			isValid: false,
			message: "Email должен содержать '@'.",
		}
	}

	if (localPart.includes("..") || domainPart.includes("..")) {
		return {
			isValid: false,
			message: "Email не должен содержать подряд идущие точки.",
		}
	}

	if (localPart.startsWith(".") || localPart.endsWith(".")) {
		return {
			isValid: false,
			message: "Локальная часть не должна начинаться или заканчиваться точкой.",
		}
	}

	if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
		return {
			isValid: false,
			message: "Доменная часть не должна начинаться или заканчиваться точкой.",
		}
	}

	return {
		isValid: true,
		message: "Email валиден.",
	}
}