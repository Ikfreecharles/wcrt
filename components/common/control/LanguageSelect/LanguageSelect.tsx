import { Box, Select, MenuItem } from '@material-ui/core';
import { BiGlobe } from 'react-icons/bi';

import { useTranslation, i18nConfig } from 'lib/i18n';
import { useSettings } from 'hooks/settings';
import { IconWrapper } from 'components/common/misc';

/** Renders all available languages as a select input. Syncs with the local state. */
export const LanguageSelect: React.FC = () => {
  const { t } = useTranslation();
  const [{ language }, setSettings] = useSettings();

  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) =>
    setSettings({ language: event.target.value as string });

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      renderValue={(value) => (
        <Box mr={1}>
          <IconWrapper
            icon={BiGlobe}
            title={t('label.language')}
            color="action"
          >
            {t(`language.${value}`)}
          </IconWrapper>
        </Box>
      )}
    >
      {i18nConfig.i18n.locales.map((item) => (
        <MenuItem key={item} value={item}>
          {t(`language.${item}`)}
        </MenuItem>
      ))}
    </Select>
  );
};
