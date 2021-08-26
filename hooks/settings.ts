import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { useMediaQuery } from '@material-ui/core';

import { Settings } from 'types';
import { i18nConfig } from 'lib/i18n';
import { settingsVar } from 'lib/variables';
import { useCanonicalUrl } from 'hooks/navigation';
import { writeSettingsToCookies, readSettingsFromCookies } from 'util/settings';

/**
 * Returns state management for local state settings. Syncs with cookies,
 * current URL or browser settings. Primarly used for appearance options.
 */
export const useSettings = () => {
  const { locale, locales } = useRouter();
  const getPageUrl = useCanonicalUrl();
  const settingsFromLocalState = useReactiveVar(settingsVar);
  const settingsFromCookies = useMemo(() => readSettingsFromCookies(), []);
  const preferredColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const settings: Settings = {
    ...settingsFromLocalState,
    language: locale || i18nConfig.i18n.defaultLocale,
  };

  const setSettings = (newSettings: Partial<Settings>) => {
    const { language, ...otherSettings } = newSettings;

    /**
     * @todo Use `router.push` after the `_app` remounting issue is fixed.
     *   https://github.com/isaachinman/next-i18next/issues/1075
     */
    if (language && locales?.includes(language))
      window.location.assign(getPageUrl(language));

    settingsVar({ ...settingsFromLocalState, ...otherSettings });
    writeSettingsToCookies(otherSettings);
  };

  // Watch updates of the preferred color scheme from browser/OS settings.
  useEffect(() => {
    settingsVar({
      ...settingsFromLocalState,
      paletteType: preferredColorScheme,
      ...settingsFromCookies,
    });
  }, [preferredColorScheme]);

  return [settings, setSettings] as const;
};
