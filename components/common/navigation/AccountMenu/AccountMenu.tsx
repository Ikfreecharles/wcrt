import { useState } from 'react';
import NextLink from 'next/link';
import { Tooltip, IconButton, Menu, MenuItem } from '@material-ui/core';
import {
  BiUser,
  BiWrench,
  BiPaintRoll,
  BiHelpCircle,
  BiPowerOff,
} from 'react-icons/bi';

import { EXTERNAL_LINK_PROPS, SUPPORT_URL } from 'lib/constants';
import { useTranslation } from 'lib/i18n';
import { signOut } from 'lib/auth';
import { useProfile } from 'hooks/profile';
import { getEntityPath } from 'util/url';
import { IconWrapper } from 'components/common/misc';
import { Avatar } from 'components/network/profile';
import { AppearanceSettingsDialog } from 'components/common/dialog';

/**
 * Renders an avatar which opens an account menu on click to reference common
 * personal views/actions.
 */
export const AccountMenu: React.FC = () => {
  const { t } = useTranslation();
  const viewerProfile = useProfile();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleSettingsClick = () => {
    handleMenuClose();
    setSettingsOpen(true);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    signOut();
  };

  return (
    <>
      <Tooltip title={viewerProfile?.name || t('label.account')!}>
        <IconButton edge="end" onClick={handleMenuOpenClick}>
          <Avatar size="small" data={viewerProfile} />
        </IconButton>
      </Tooltip>

      {viewerProfile && (
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={handleMenuClose}
        >
          <li>
            <NextLink href={getEntityPath(viewerProfile.id)} passHref>
              <MenuItem component="a" onClick={handleMenuClose}>
                <IconWrapper icon={BiUser} color="action">
                  {t('label.myProfile')}
                </IconWrapper>
              </MenuItem>
            </NextLink>
          </li>

          <li>
            <NextLink href="/personal/data" passHref>
              <MenuItem component="a" onClick={handleMenuClose}>
                <IconWrapper icon={BiWrench} color="action">
                  {t('label.settings')}
                </IconWrapper>
              </MenuItem>
            </NextLink>
          </li>

          <MenuItem onClick={handleSettingsClick}>
            <IconWrapper icon={BiPaintRoll} color="action">
              {t('label.display')}
            </IconWrapper>
          </MenuItem>

          <li>
            <MenuItem component="a" href={SUPPORT_URL} {...EXTERNAL_LINK_PROPS}>
              <IconWrapper icon={BiHelpCircle} color="action">
                {t('label.help')}
              </IconWrapper>
            </MenuItem>
          </li>

          <MenuItem onClick={handleLogoutClick}>
            <IconWrapper icon={BiPowerOff} color="action">
              {t('action.signOut')}
            </IconWrapper>
          </MenuItem>
        </Menu>
      )}

      <AppearanceSettingsDialog open={settingsOpen} setOpen={setSettingsOpen} />
    </>
  );
};
