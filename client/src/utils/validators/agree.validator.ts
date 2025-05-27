export const validateAgree = (agree: unknown): string | null => {
	if (typeof agree !== "boolean") {
		return "Значение должно быть булевым (true или false).";
	}

	if (!agree) {
		return "Для продолжения необходимо согласие с условиями.";
	}

	return null;
}