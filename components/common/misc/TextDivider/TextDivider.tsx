import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

type Props = {
  /** The title of the following section */
  label: string;
  /** An optional number to display at the right */
  count?: number;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    position: 'relative',
    padding: spacing(2, 0),
  },
  stroke: {
    backgroundColor: palette.divider,
  },
  textWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    backgroundColor: palette.background.default,
    color: palette.text.secondary,
    whiteSpace: 'nowrap',
    '&:last-child': {
      padding: spacing(0, 0, 0, 1),
    },
    '&:first-child': {
      padding: spacing(0, 1, 0, 0),
    },
  },
}));

/**
 * Renders a textual divider which can be used as a subtle heading and to
 * visually separate one section from another.
 */
export const TextDivider: React.FC<Props> = ({ label, count, className }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.root, className)}>
      <Divider className={classes.stroke} />

      <Box className={classes.textWrapper}>
        <Typography component="h3" variant="overline" className={classes.label}>
          {label}
        </Typography>

        {typeof count !== 'undefined' && (
          <Typography variant="overline" className={classes.label}>
            {count}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
