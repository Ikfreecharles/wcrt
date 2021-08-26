import { makeStyles } from '@material-ui/core';
import { SnackbarProvider as NotistackProvider } from 'notistack';

import { calcMobileNavOffset } from 'util/layout';

const useStyles = makeStyles(({ breakpoints }) => ({
  dodgeMobileNav: {
    [breakpoints.down('sm')]: {
      bottom: calcMobileNavOffset(14),
      fallbacks: {
        bottom: calcMobileNavOffset(14, true),
      },
    },
  },
}));

/**
 * Provides a preconfigured context of `notistack` used for snack bar
 * notifications. As we always want to show notifications at the bottom left, we
 * need to adjust the position for the mobile navigation controls.
 */
export const SnackbarProvider: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <NotistackProvider
      classes={{
        containerRoot: classes.dodgeMobileNav,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children}
    </NotistackProvider>
  );
};
