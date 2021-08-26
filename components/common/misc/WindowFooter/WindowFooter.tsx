import { Box, makeStyles } from '@material-ui/core';

type Props = {
  /** Content to display on the left side */
  leadingElement?: React.ReactNode;
};

const useStyles = makeStyles(({ spacing, zIndex, shadows }) => ({
  root: {
    flex: 'none',
    display: 'flex',
    alignItems: 'center',
    height: spacing(7),
    padding: spacing(1),
    zIndex: zIndex.appBar,
    boxShadow: shadows[4],
  },
  leadingElement: {
    flex: 1,
    marginRight: spacing(1),
  },
}));

/**
 * Wraps some layout elements to display a footer area within a window component
 * (e.g. `GroupWindow`)
 */
export const WindowFooter: React.FC<Props> = ({ leadingElement, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.leadingElement}>{leadingElement}</Box>
      <Box>{children}</Box>
    </Box>
  );
};
