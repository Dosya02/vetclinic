import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// English
import enCommon from './en/common.json';
import enNav from './en/nav.json';
// Russian
import ruCommon from './ru/common.json';
import ruNav from './ru/nav.json';
// Kazakh
import kzCommon from './kz/common.json';
import kzNav from './kz/nav.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "ru",
		lng: localStorage.getItem("lang") || "ru",
		debug: true,
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
		react: {
			useSuspense: false,
		},
		resources: {
			en: {
				translation: {
					common: enCommon,
					nav: enNav,
				},
			},
			ru: {
				translation: {
					common: ruCommon,
					nav: ruNav,
				},
			},
			kz: {
				translation: {
					common: kzCommon,
					nav: kzNav,
				},
			},
		},
	});

export default i18n;