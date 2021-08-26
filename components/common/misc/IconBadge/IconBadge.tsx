import { Badge, makeStyles, SvgIcon } from '@material-ui/core';
import { IconType } from 'react-icons';
import clsx from 'clsx';

type Props = {
  /** The icon */
  icon: IconType;
  /** Show a colored dot */
  hasActivity?: boolean;
};

const useStyles = makeStyles(({ spacing }) => ({
  iconMask: {
    mask: `radial-gradient(
        circle at ${spacing(3)}px ${spacing(0.75)}px,
        transparent ${spacing(0.75)}px,
        white ${spacing(0.75)}px
      )`,
  },
  badge: {
    top: spacing(0.75),
  },
}));

/** Renders an icon with an optional colored dot to indicate activity. */
export const IconBadge: React.FC<Props> = ({ icon, hasActivity }) => {
  const classes = useStyles();

  return (
    <Badge
      color="secondary"
      variant="dot"
      invisible={!hasActivity}
      classes={{ badge: classes.badge }}
      data-testid="badge"
    >
      <SvgIcon
        component={icon}
        className={clsx(hasActivity && classes.iconMask)}
        data-testid="svg"
      />
    </Badge>
  );
};
