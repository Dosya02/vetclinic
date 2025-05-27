export const validateCode = (code: unknown): string | null => {
	if (!Array.isArray(code)) {
		return "Код должен быть массивом.";
	}

	if (code.length !== 6) {
		return "Код должен состоять из 6 символов.";
	}

	for (let i = 0; i < code.length; i++) {
		if (typeof code[i] !== "string" || !/^\d$/.test(code[i])) {
			return "Пожалуйста, заполните все поля.";
		}
	}

	if (code.some((digit) => digit === "")) {
		return "Все поля кода должны быть заполнены.";
	}

	return null;
}