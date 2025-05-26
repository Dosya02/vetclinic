export const API_BASE_URL = "http://localhost:5000/api/v1";

export const API_ROUTES = {
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		PROFILE: "/auth/profile",
		SEND_CODE: "/auth/send-code",
		VERIFY_CODE: "/auth/verify-code",
	},
}

export const API_HEADERS = {
	JSON: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
}

export const TOKEN_STORAGE_KEY = "userToken";

export enum HTTP_METHOD {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}