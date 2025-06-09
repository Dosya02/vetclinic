import { ROUTES } from '@constants'

export const ANCHORS = {
	INTRO: { id: 'intro', label: 'Главная' },
	ABOUT_US: { id: 'about-us', label: 'О Нас' },
	TEAM: { id: 'team', label: 'Врачи' },
	SERVICES: { id: 'services', label: 'Услуги' },
	CONTACTS: { id: 'contacts', label: 'Контакты' },
} as const

export const NAV_ITEMS_CLIENT = [
	{ id: 'intro', label: 'Главная' },
	{ id: 'about-us', label: 'О Нас' },
	{ id: 'team', label: 'Врачи' },
	{ id: 'services', label: 'Услуги' },
	{ id: 'contacts', label: 'Контакты' },
] as const

export const NAV_ITEMS_ADMIN = [
	{ id: 'intro', label: 'Главная', href: ROUTES.HOME },
	{ id: 'admin-panel', label: 'Админ панель', href: ROUTES.ADMIN },
] as const

export const NAV_ITEMS_VET = [
	{ id: 'intro', label: 'Главная', href: ROUTES.HOME },
	{ id: 'vet-appointments', label: 'Записи', href: ROUTES.VET_APPOINTMENTS },
] as const

export const ADMIN_NAV_ITEMS = [
	{ label: 'Виды', href: ROUTES.ADMIN_SPECIES },
	{ label: 'Породы', href: ROUTES.ADMIN_BREEDS },
	{ label: 'Услуги', href: ROUTES.ADMIN_SERVICES },
	{ label: 'Врачи', href: ROUTES.ADMIN_VETS },
] as const

export type AnchorType = ValueOf<typeof ANCHORS>
export type AdminNavItem = ValueOf<typeof ADMIN_NAV_ITEMS>