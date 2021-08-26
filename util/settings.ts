import { NextPageContext } from 'next';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { Settings } from 'types';

/** The cookies reflect the user-specific settings overwrites except the language. */
type CookieSettings = Partial<Omit<Settings, 'language'>>;

/** Returns the settings from the cookies. */
export const readSettingsFromCookies = (ctx?: NextPageContext) => {
  const cookies = parseCookies(ctx);

  const settings: CookieSettings = Object.keys(cookies)
    .filter((item) => item.startsWith('settings.'))
    .reduce(
      (data, key) => ({
        ...data,
        [key.replace('settings.', '')]: cookies[key],
      }),
      {}
    );

  return settings;
};

/** Writes some settings to the cookies. */
export const writeSettingsToCookies = (newSettings: CookieSettings) => {
  let key: keyof typeof newSettings;
  for (key in newSettings) {
    const cookieName = `settings.${key}`;
    const cookieValue = newSettings[key];

    if (cookieValue != null) {
      setCookie(null, cookieName, cookieValue, {
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: '/',
      });
    } else {
      destroyCookie(null, cookieName);
    }
  }
};
