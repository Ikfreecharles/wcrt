import {
  Box,
  Container,
  Grid,
  GridSpacing,
  GridSize,
  makeStyles,
} from '@material-ui/core';

type Props = {
  /** The width of the wrapping container */
  containerWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** The spacing of the wrapping grid container */
  spacing?: GridSpacing;
  /** The size of the wrapping grid item */
  xs?: GridSize;
  /** The size of the wrapping grid item */
  sm?: GridSize;
  /** The size of the wrapping grid item */
  md?: GridSize;
  /** The size of the wrapping grid item */
  lg?: GridSize;
  /** The size of the wrapping grid item */
  xl?: GridSize;
  /** The root element type of the component */
  component?: React.ElementType;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    position: 'fixed',
    width: '100vw',
    marginLeft: spacing(-3),
  },
  helperContainer: {
    marginLeft: 0,
    marginRight: 0,
  },
  gridContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  gridItem: {
    maxHeight: '100vh',
    overflowY: 'auto',
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
}));

/**
 * Renders a grid column, which remains fixed on the screen and therefore can be
 * independently scrolled. To maintain its horizontal position it needs to be
 * used within a grid item.
 */
export const FixedColumn: React.FC<Props> = ({
  containerWidth,
  spacing,
  xs,
  sm,
  md,
  lg,
  xl,
  component,
  className,
  children,
}) => {
  const classes = useStyles();

  return (
    <Box component={component} className={classes.wrapper}>
      <Container
        maxWidth={containerWidth}
        className={classes.helperContainer}
        data-testid="container"
      >
        <Grid
          container
          spacing={spacing}
          className={classes.gridContainer}
          data-testid="grid-container"
        >
          <Grid
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            className={classes.gridItem}
            data-testid="grid-item"
          >
            <Box minHeight="100vh" py={spacing} className={className}>
              {children}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
