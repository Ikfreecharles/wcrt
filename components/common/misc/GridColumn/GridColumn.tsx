import { useMediaQuery, Grid, GridSize, Theme } from '@material-ui/core';

import { ColumnProvider } from 'context/column';

type Props = {
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
  /** Custom styles */
  className?: string;
};

/**
 * Renders a grid item and provides the column size as context, which then can
 * be used for column sensitive breakpoints.
 */
export const GridColumn: React.FC<Props> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  children,
}) => {
  const breakpointWidths = { xs, sm, md, lg, xl };
  const activeBreakpoints: Record<keyof typeof breakpointWidths, boolean> = {
    xs: true,
    sm: useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('sm')),
    md: useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('md')),
    lg: useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('lg')),
    xl: useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('xl')),
  };

  let width: GridSize = xs ? xs : 12;
  let key: keyof typeof breakpointWidths;

  for (key in activeBreakpoints) {
    width = ((activeBreakpoints[key] && breakpointWidths[key]) ||
      width) as GridSize;
  }

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} className={className}>
      <ColumnProvider value={width === 'auto' ? 12 : width}>
        {children}
      </ColumnProvider>
    </Grid>
  );
};
