import { ValidationResult } from "../types";

export const validateCode = (code: unknown): ValidationResult => {
	if (!Array.isArray(code)) {
		return {
			isValid: false,
			message: "Код должен быть массивом.",
		};
	}

	if (code.length !== 6) {
		return {
			isValid: false,
			message: "Код должен состоять из 6 символов.",
		};
	}

	for (let i = 0; i < code.length; i++) {
		if (typeof code[i] !== "string" || !/^\d$/.test(code[i])) {
			return {
				isValid: false,
				message: `Каждый элемент в позиции ${i + 1} должен быть строкой с одной цифрой.`,
			};
		}
	}

	if (code.some((digit) => digit === "")) {
		return {
			isValid: false,
			message: "Все поля кода должны быть заполнены.",
		};
	}

	return {
		isValid: true,
		message: "Код валиден.",
	};
};