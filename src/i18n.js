import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
import enCommon from '../content/en/common.json';
import enNotifications from '../content/en/notifications.json';
import enOnboarding from '../content/en/onboarding.json';
import enErrors from '../content/en/errors.json';
import enCheckout from '../content/en/checkout.json';
import enSettings from '../content/en/settings.json';

// German
import deCommon from '../content/de/common.json';
import deNotifications from '../content/de/notifications.json';
import deOnboarding from '../content/de/onboarding.json';
import deErrors from '../content/de/errors.json';
import deCheckout from '../content/de/checkout.json';
import deSettings from '../content/de/settings.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        notifications: enNotifications,
        onboarding: enOnboarding,
        errors: enErrors,
        checkout: enCheckout,
        settings: enSettings,
      },
      de: {
        common: deCommon,
        notifications: deNotifications,
        onboarding: deOnboarding,
        errors: deErrors,
        checkout: deCheckout,
        settings: deSettings,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
