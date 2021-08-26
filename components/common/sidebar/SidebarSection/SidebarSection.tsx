import {
  Box,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

type Props = {
  /** The title of the section */
  title: string;
  /** An optional number to display at the right */
  count?: number;
};

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    '& + &': {
      marginTop: spacing(2),
      [breakpoints.up('md')]: {
        marginTop: spacing(4),
      },
    },
  },
}));

/** Wraps specific sidebar elements and renders a heading. */
export const SidebarSection: React.FC<Props> = ({ title, count, children }) => {
  const isDesktop = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('md')
  );
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box mb={isDesktop ? 2 : 1} display="flex" justifyContent="space-between">
        <Typography component="h2" variant={isDesktop ? 'h5' : 'h6'}>
          {title}
        </Typography>

        {count != null && (
          <Typography
            component="span"
            variant={isDesktop ? 'h5' : 'h6'}
            color="textSecondary"
          >
            {count}
          </Typography>
        )}
      </Box>

      {children}
    </Box>
  );
};
