import { LinearProgress, makeStyles } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { calcMobileNavOffset } from 'util/layout';

const useStyles = makeStyles(({ breakpoints, zIndex }) => ({
  root: {
    position: 'fixed',
    width: '100vw',
    left: 0,
    bottom: calcMobileNavOffset(0),
    zIndex: zIndex.appBar,
    fallbacks: {
      bottom: calcMobileNavOffset(0, true),
    },
    [breakpoints.up('md')]: {
      top: 0,
      bottom: 'auto',
    },
  },
}));

/**
 * Renders a linear progress indicator on the edge of the screen meant to be
 * used for global loading states.
 */
export const PageProgress: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <LinearProgress
      className={classes.root}
      aria-label={t('label.loadingPage')}
    />
  );
};
