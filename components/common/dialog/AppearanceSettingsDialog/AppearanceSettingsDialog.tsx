import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Radio,
  Switch,
  Divider,
  makeStyles,
} from '@material-ui/core';

import { CommonDialogProps } from 'types';
import { useSettings } from 'hooks/settings';
import { useTranslation, i18nConfig } from 'lib/i18n';
import { Dialog } from 'components/common/misc';

const useStyles = makeStyles(({ spacing }) => ({
  secondaryAction: {
    right: spacing(2.5),
  },
}));

/**
 * Renders a dialog for modifying interface settings like language and theme
 * type. Syncs with the local state.
 */
export const AppearanceSettingsDialog: React.FC<CommonDialogProps> = ({
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  const [{ language, paletteType }, setSettings] = useSettings();
  const classes = useStyles();
  const isDarkMode = paletteType === 'dark';

  const getLanguageHandler = (language: string) => () =>
    setSettings({ language });

  const handleThemeChange = () =>
    setSettings({ paletteType: isDarkMode ? 'light' : 'dark' });

  return (
    <Dialog
      title={t('label.display')}
      open={open}
      setOpen={setOpen}
      gutters={false}
    >
      <List subheader={<ListSubheader>{t('label.language')}</ListSubheader>}>
        {i18nConfig.i18n.locales.map((item, index) => (
          <ListItem button onClick={getLanguageHandler(item)} key={index}>
            <ListItemText
              id={`radio-language-label-${item}`}
              primary={t(`language.${item}`)}
            />

            <ListItemSecondaryAction className={classes.secondaryAction}>
              <Radio
                name="radio-language"
                value={item}
                checked={item === language}
                onChange={getLanguageHandler(item)}
                inputProps={{
                  'aria-labelledby': `radio-language-label-${item}`,
                }}
                edge="end"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List subheader={<ListSubheader>{t('label.appearance')}</ListSubheader>}>
        <ListItem button onClick={handleThemeChange}>
          <ListItemText
            id="switch-dark-mode-label"
            primary={t('palette.dark')}
          />

          <ListItemSecondaryAction className={classes.secondaryAction}>
            <Switch
              name="switch-dark-mode"
              onChange={handleThemeChange}
              checked={isDarkMode}
              inputProps={{ 'aria-labelledby': 'switch-dark-mode-label' }}
              edge="end"
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Dialog>
  );
};
