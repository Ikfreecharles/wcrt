import { BiMoon, BiSun } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useSettings } from 'hooks/settings';
import { IconButton } from 'components/common/control';

/** Renders a simple button to toggle the theme type. Syncs with the local state. */
export const DarkModeToggle: React.FC = () => {
  const { t } = useTranslation();
  const [{ paletteType }, setSettings] = useSettings();

  const isDarkModeActive = paletteType === 'dark';

  const handleClick = () =>
    setSettings({ paletteType: isDarkModeActive ? 'light' : 'dark' });

  return (
    <IconButton
      title={isDarkModeActive ? t('palette.light') : t('palette.dark')}
      icon={isDarkModeActive ? BiSun : BiMoon}
      edge="end"
      onClick={handleClick}
    />
  );
};
