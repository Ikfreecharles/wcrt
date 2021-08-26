import { useContext } from 'react';
import { Box, Fab, makeStyles, SvgIcon, Tooltip } from '@material-ui/core';
import { IconType } from 'react-icons';
import { BiPlus } from 'react-icons/bi';

import { GroupContext } from 'context/group';
import { getInternalPath } from 'util/url';
import { useRouter } from 'next/router';

type Props = {
  /** The display icon (defaults to a plus sign) */
  icon?: IconType;
  /** The label of the action */
  label: string;
  /** A link target relative to the internal group URL */
  href?: string;
  /** An action to execute on click */
  onClick?: () => void;
};

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    left: '50%',
    bottom: spacing(2),
    transform: 'translateX(-50%)',
  },
}));

/**
 * Renders a floating action button for adding new group-related items. Meant to
 * be used within the group window.
 */
export const GroupEntityCreateButton: React.FC<Props> = ({
  icon,
  label,
  href,
  onClick,
}) => {
  const router = useRouter();
  const { groupId } = useContext(GroupContext);
  const classes = useStyles();

  const handleClick = () => {
    onClick?.();
    if (href) router.push(getInternalPath(groupId, href));
  };

  return (
    <Box className={classes.root}>
      <Tooltip title={label}>
        <Fab color="secondary" onClick={handleClick} className={classes.button}>
          <SvgIcon component={icon || BiPlus} />
        </Fab>
      </Tooltip>
    </Box>
  );
};
