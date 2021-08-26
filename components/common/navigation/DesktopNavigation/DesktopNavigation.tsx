import NextLink from 'next/link';
import {
  Box,
  Button,
  makeStyles,
  fade,
  Badge,
  SvgIcon,
} from '@material-ui/core';
import lowerFirst from 'lodash/lowerFirst';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { useMainNavigation } from 'hooks/navigation';

const useStyles = makeStyles(({ spacing, palette }) => ({
  button: {
    padding: spacing(0.75, 1.75),
    color: palette.text.secondary,
  },
  activeButton: {
    '&, &:hover': {
      color: palette.primary.main,
      backgroundColor: fade(
        palette.primary.main,
        palette.action.activatedOpacity
      ),
    },
  },
  badge: {
    right: spacing(-0.75),
    top: spacing(0.25),
  },
}));

/** Renders globally visible navigation links for large screens. */
export const DesktopNavigation: React.FC = () => {
  const { t } = useTranslation();
  const menuItems = useMainNavigation();
  const classes = useStyles();

  return (
    <Box component="nav" data-testid="desktop">
      {menuItems.map(({ icon, label, path, isActive, hasMessages }, index) => (
        <Box mt={index > 0 ? 0.5 : undefined} key={index}>
          <NextLink href={path} passHref>
            <Button
              size="large"
              startIcon={<SvgIcon component={icon} />}
              className={clsx(classes.button, isActive && classes.activeButton)}
              aria-label={
                hasMessages
                  ? `${label} (${lowerFirst(t('label.newActivity'))})`
                  : label
              }
              aria-current={isActive ? 'page' : undefined}
            >
              <Badge
                variant="dot"
                color="secondary"
                invisible={!hasMessages}
                classes={{ badge: classes.badge }}
              >
                {label}
              </Badge>
            </Button>
          </NextLink>
        </Box>
      ))}
    </Box>
  );
};
