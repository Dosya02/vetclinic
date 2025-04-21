export const validateEmail = (email: string): string => {
	if (!email) {
		return "Пожалуйста, введите почту.";
	}

	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailRegex.test(email)) {
		return "Пожалуйста, введите корректный email.";
	}

	return "";
};

export const validatePassword = (password: string): string => {
	if (!password) {
		return "Пожалуйста, введите пароль.";
	}

	if (password.length < 6) {
		return "Пароль должен содержать не менее 6 символов.";
	}

	if (!/[A-Z]/.test(password)) {
		return "Пароль должен содержать хотя бы одну заглавную букву.";
	}

	if (!/[a-z]/.test(password)) {
		return "Пароль должен содержать хотя бы одну строчную букву.";
	}

	if (!/[0-9]/.test(password)) {
		return "Пароль должен содержать хотя бы одну цифру.";
	}

	return "";
}