import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import landingEn from '../../public/locales/en/landing.json';
import landingRu from '../../public/locales/ru/landing.json';

const resources = {
  en: {
    landing: landingEn,
  },
  ru: {
    landing: landingRu,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
