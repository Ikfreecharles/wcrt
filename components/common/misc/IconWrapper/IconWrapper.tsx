import { Box, SvgIcon, Tooltip, makeStyles } from '@material-ui/core';
import { IconType } from 'react-icons';
import clsx from 'clsx';

type Props = {
  /** The icon */
  icon: IconType;
  /** An tooltip title for the icon */
  title?: string;
  /** The icon size */
  size?: number;
  /** The spacing between the icon and the children */
  spacing?: number;
  /** The icon color */
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
  /** A custom icon color (e.g. a hex color) */
  customColor?: string;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'customColor'> & { size: number };

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: ({ size, customColor }: StyleProps) => ({
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: spacing(size),
    height: spacing(size),
    fontSize: spacing(size),
    color: customColor ?? undefined,
  }),
}));

/**
 * Renders an icon side-by-side of other children elements (commonly text). Can
 * have explanatory (with `title` prop) or decorational (without `title` prop) purposes.
 */
export const IconWrapper: React.FC<Props> = ({
  icon,
  title,
  size = 3,
  spacing = 1,
  color,
  customColor,
  children,
  className,
}) => {
  const classes = useStyles({ size, customColor });

  return (
    <Box className={clsx(classes.root, className)}>
      {title ? (
        <Tooltip title={title}>
          <Box role="img" className={classes.icon}>
            <SvgIcon
              component={icon}
              color={color}
              fontSize="inherit"
              data-testid="svg"
            />
          </Box>
        </Tooltip>
      ) : (
        <SvgIcon component={icon} color={color} className={classes.icon} />
      )}

      <Box ml={size + spacing}>{children}</Box>
    </Box>
  );
};
