import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';

type Props = {
  /** A date to display as label */
  date?: Date;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    position: 'relative',
    margin: spacing(1, -2),
  },
  stroke: {
    backgroundColor: palette.secondary.light,
  },
  neutralStroke: {
    backgroundColor: palette.divider,
  },
  label: {
    position: 'absolute',
    top: '50%',
    left: spacing(4.5),
    transform: 'translate(-50%,-50%)',
    padding: spacing(0, 1),
    backgroundColor: palette.background.paper,
    color: palette.secondary.main,
    whiteSpace: 'nowrap',
  },
  neutralLabel: {
    left: '50%',
    color: palette.text.disabled,
  },
}));

/**
 * Renders a divider to mark a new section within a chat message stream. If used
 * with a specific date, it renders it as label and otherwise fallbacks to mark
 * the following messages as new.
 */
export const ChatDivider: React.FC<Props> = ({ date }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Divider
        className={clsx(classes.stroke, date && classes.neutralStroke)}
      />

      <Typography
        variant="overline"
        className={clsx(classes.label, date && classes.neutralLabel)}
      >
        {date ? t('format.simpleDate', { date }) : t('label.new')}
      </Typography>
    </Box>
  );
};
