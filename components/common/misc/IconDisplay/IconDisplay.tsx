import { SvgIcon, makeStyles } from '@material-ui/core';
import { IconType } from 'react-icons';

type Props = {
  /** The icon */
  icon: IconType;
  /** The icon size */
  size?: number;
  /** The icon color */
  color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
};

type StyleProps = { size: number };

const useStyles = makeStyles(({ spacing }) => ({
  root: ({ size }: StyleProps) => ({
    verticalAlign: 'top',
    fontSize: spacing(size),
  }),
}));

/** Renders a large icon for decorational purposes. */
export const IconDisplay: React.FC<Props> = ({ icon, size = 8, color }) => {
  const classes = useStyles({ size });

  return (
    <SvgIcon
      component={icon}
      className={classes.root}
      color={color}
      data-testid="svg"
    />
  );
};
