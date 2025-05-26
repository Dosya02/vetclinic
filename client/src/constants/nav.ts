export const ANCHORS = {
	INTRO: { id: "intro", label: "Главная" },
	ABOUT_US: { id: "about-us", label: "О Нас" },
	TEAM: { id: "team", label: "Врачи" },
	SERVICES: { id: "services", label: "Услуги" },
	CONTACTS: { id: "contacts", label: "Контакты" },
} as const;

export const NAV_ITEMS = [
	ANCHORS.INTRO,
	ANCHORS.ABOUT_US,
	ANCHORS.TEAM,
	ANCHORS.SERVICES,
	ANCHORS.CONTACTS,
];