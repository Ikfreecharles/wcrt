import { Children } from 'react';
import { Box, makeStyles } from '@material-ui/core';

type Props = {
  vertical?: boolean;
  className?: string;
};

type StyleProps = Pick<Props, 'vertical'>;

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: ({ vertical }: StyleProps) => ({
    display: 'flex',
    width: vertical ? '100%' : 'auto',
    flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center',
    padding: vertical ? spacing(2) : spacing(1, 3),
    border: `1px solid ${palette.divider}`,
    borderRadius: spacing(2.5),
    color: palette.text.secondary,
  }),
  item: ({ vertical }: StyleProps) => ({
    '&:not(:first-child)': {
      paddingTop: vertical ? spacing(1) : 0,
      paddingLeft: vertical ? 0 : spacing(3),
    },
  }),
}));

/**
 * Renders an emphasized area to present different informations side-by-side.
 * Inserts a grid item for each of its children.
 */
export const Well: React.FC<Props> = ({ vertical, children }) => {
  const classes = useStyles({ vertical });

  return (
    <Box className={classes.root} data-testid="well-container">
      {Children.map(
        children,
        (child) =>
          child && (
            <Box className={classes.item} data-testid="well-item">
              {child}
            </Box>
          )
      )}
    </Box>
  );
};
