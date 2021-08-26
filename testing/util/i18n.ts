import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { i18nConfig } from 'lib/i18n';

i18next.use(initReactI18next).init({
  ...i18nConfig,
  lng: 'en',
  ns: ['common', 'group'],
  defaultNS: 'common',
  resources: {
    en: {
      common: { ...require('public/static/locales/en/common.json') },
      group: { ...require('public/static/locales/en/group.json') },
    },
  },
});

export const i18n = i18next;

export const t = (key: string): string => i18next.t(key);
