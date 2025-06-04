import { APP_ROUTES } from '@routes';

export const ANCHORS = {
  INTRO: { id: 'intro', label: 'Главная' },
  ABOUT_US: { id: 'about-us', label: 'О Нас' },
  TEAM: { id: 'team', label: 'Врачи' },
  SERVICES: { id: 'services', label: 'Услуги' },
  CONTACTS: { id: 'contacts', label: 'Контакты' },
} as const;

export const NAV_ITEMS_CLIENT = [
  { id: 'intro', label: 'Главная' },
  { id: 'about-us', label: 'О Нас' },
  { id: 'team', label: 'Врачи' },
  { id: 'services', label: 'Услуги' },
  { id: 'contacts', label: 'Контакты' },
] as const;

export const NAV_ITEMS_ADMIN = [
  { id: 'intro', label: 'Главная', href: APP_ROUTES.HOME },
  { id: 'admin-panel', label: 'Админ Панель', href: APP_ROUTES.ADMIN },
] as const;

export const NAV_ITEMS_VET = [
  { id: 'intro', label: 'Главная', href: APP_ROUTES.HOME },
  { id: 'vet-panel', label: 'Записи', href: APP_ROUTES.VET },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'Clients', href: APP_ROUTES.ADMIN_CLIENTS },
  { label: 'Vets', href: APP_ROUTES.ADMIN_VETS },
  { label: 'Admins', href: APP_ROUTES.ADMIN_ADMINS },
  { label: 'Pets', href: APP_ROUTES.ADMIN_PETS },
  { label: 'Species', href: APP_ROUTES.ADMIN_SPECIES },
  { label: 'Breeds', href: APP_ROUTES.ADMIN_BREEDS },
  { label: 'Vaccines', href: APP_ROUTES.ADMIN_VACCINES },
] as const;