import { ValidationResult } from "../types";

export const validateAgree = (agree: unknown): ValidationResult => {
	if (typeof agree !== "boolean") {
		return {
			isValid: false,
			message: "Значение должно быть булевым (true или false).",
		}
	}

	if (!agree) {
		return {
			isValid: false,
			message: "Для продолжения необходимо согласие с условиями.",
		}
	}

	return {
		isValid: true,
		message: "Согласие получено.",
	}
}