import { useState } from 'react';
import {
  Fab,
  SvgIcon,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { BiPlus, BiPulse, BiGroup } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { signIn, useSession } from 'lib/auth';
import {
  ImpulseCreateDialog,
  GroupCreateDialog,
} from 'components/common/dialog';
import { IconWrapper } from 'components/common/misc';

type Props = {
  /** Show a label next to the plus icon */
  extended?: boolean;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  hidden: {
    visibility: 'hidden',
  },
  iconMargin: {
    marginRight: spacing(1),
  },
  menuHeader: {
    padding: spacing(1.5, 2),
    color: palette.secondary.contrastText,
    backgroundColor: `${palette.secondary.main} !important`,
    cursor: 'default',
    '&:first-child': {
      marginTop: spacing(-1),
    },
    '&:last-child': {
      marginBottom: spacing(-1),
    },
  },
}));

/**
 * Renders a global create button as universal call to action for different
 * primary actions like creating new impulses and groups.
 */
export const CreateButton: React.FC<Props> = ({ extended, className }) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<'impulse' | 'group' | null>(null);
  const classes = useStyles();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    session ? setAnchorEl(event.currentTarget) : signIn();
  const handleMenuClose = () => setAnchorEl(null);

  const handleImpulseClick = () => {
    handleMenuClose();
    setOpen('impulse');
  };

  const handleGroupClick = () => {
    handleMenuClose();
    setOpen('group');
  };

  const menuHeader = (
    <MenuItem onClick={handleMenuClose} className={classes.menuHeader}>
      <IconWrapper icon={BiPlus}>
        <Typography variant="button">{t('action.create')}</Typography>
      </IconWrapper>
    </MenuItem>
  );

  return (
    <>
      <Fab
        variant={extended ? 'extended' : 'round'}
        color="secondary"
        onClick={handleMenuClick}
        className={clsx(className, anchorEl && classes.hidden)}
        aria-label={t('action.create')}
        aria-controls="create-menu"
      >
        <SvgIcon
          component={BiPlus}
          className={extended ? classes.iconMargin : undefined}
        />
        {extended && t('action.create')}
      </Fab>

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          horizontal: extended ? 'left' : 'center',
          vertical: extended ? 'top' : 'bottom',
        }}
        transformOrigin={{
          horizontal: extended ? 'left' : 'center',
          vertical: extended ? 'top' : 'bottom',
        }}
        keepMounted
        open={!!anchorEl}
        onClose={handleMenuClose}
        id="create-menu"
      >
        {extended && menuHeader}

        <MenuItem onClick={handleImpulseClick}>
          <IconWrapper icon={BiPulse} color="action">
            {t('content.type.impulse')}
          </IconWrapper>
        </MenuItem>

        <MenuItem onClick={handleGroupClick}>
          <IconWrapper icon={BiGroup} color="action">
            {t('label.group')}
          </IconWrapper>
        </MenuItem>

        {!extended && menuHeader}
      </Menu>

      <ImpulseCreateDialog
        open={open === 'impulse'}
        setOpen={(value: boolean) => setOpen(value ? 'impulse' : null)}
      />

      <GroupCreateDialog
        open={open === 'group'}
        setOpen={(value: boolean) => setOpen(value ? 'group' : null)}
      />
    </>
  );
};
