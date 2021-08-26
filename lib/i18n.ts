import * as NextI18Next from 'next-i18next';
import dayjs from 'dayjs';
import numeral from 'numeral';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import path from 'path';

import 'numeral/locales/de';
import 'dayjs/locale/de';

numeral.localeData('de').delimiters.thousands = '.';
dayjs.extend(minMax);
dayjs.extend(relativeTime);

/** Our custom configuration for implementing internationalization via `next-i18next`. */
export const i18nConfig: NextI18Next.UserConfig = {
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
  },
  serializeConfig: false,
  localePath: path.resolve('./public/static/locales'),
  interpolation: {
    format: (value, format, lng) => {
      if (typeof value === 'number') {
        numeral.locale(lng);
        const localeNumber = numeral(value);

        switch (format) {
          case 'large':
            return localeNumber.format('0[.]0a');
          case 'ordinal':
            return localeNumber.format('0o');
          default:
            return localeNumber.format();
        }
      }

      if (value instanceof Date && lng) {
        const localeDate = dayjs(value).locale(lng);

        switch (format) {
          case 'relative':
            return localeDate.fromNow();
          case 'relativePast':
            return dayjs.min(dayjs(), localeDate).fromNow();
          default:
            return localeDate.format(format);
        }
      }

      return value;
    },
  },
};

/** A custom export of the HoC from `next-i18next`. */
export const appWithTranslation: NextI18Next.AppWithTranslation = (Component) =>
  NextI18Next.appWithTranslation(Component, i18nConfig);

export const { i18n, useTranslation } = NextI18Next;
