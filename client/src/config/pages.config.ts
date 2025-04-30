class PageConfig {
	home = "/";
	services = "/services";
	appointment = "/appointment";
	login = "/login";
	registration = "/registration";
	// --> Profile routes
	profile = "/profile";
	profileAccountDetails = "account-details";
	profilePets = "pets";
	profilePetDetails = "pets/:slugAndId";
	profileAppointments = "appointments";
}

export const pageConfig = new PageConfig();