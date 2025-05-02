class ApiConfig {
	baseUrl = "http://localhost:5000/api";
	authUrl = `${this.baseUrl}/auth`;
	loginUrl = `${this.authUrl}/login`;
	registrationUrl = `${this.authUrl}/registration`;
}

export const apiConfig = new ApiConfig();