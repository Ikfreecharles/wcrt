import { useState } from 'react';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IconType } from 'react-icons';
import { BiExport, BiLink } from 'react-icons/bi';
import FacebookCircleSvg from 'boxicons/svg/logos/bxl-facebook-circle.svg';
import TwitterSvg from 'boxicons/svg/logos/bxl-twitter.svg';
import LinkedInSquareSvg from 'boxicons/svg/logos/bxl-linkedin-square.svg';

import { EXTERNAL_LINK_PROPS } from 'lib/constants';
import { useTranslation } from 'lib/i18n';
import { useSharingUrl } from 'hooks/navigation';
import { IconWrapper } from 'components/common/misc';
import { IconButton } from 'components/common/control';

/**
 * Renders a button which provides various options to post a link to the current
 * page on social media platforms or copy it to the clipboard.
 */
export const ShareButton: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const getShareUrl = useSharingUrl();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLinkCopy = () => {
    enqueueSnackbar(t('notice.linkCopied'));
    handleMenuClose();
  };

  const externalServices: Array<{
    name: Parameters<typeof getShareUrl>[0];
    icon: IconType;
    color: string;
  }> = [
    { name: 'Facebook', icon: FacebookCircleSvg, color: '#4267b2' },
    { name: 'Twitter', icon: TwitterSvg, color: '#1da1f2' },
    { name: 'LinkedIn', icon: LinkedInSquareSvg, color: '#0077b5' },
  ];

  return (
    <>
      <IconButton
        title={t('action.share')}
        icon={BiExport}
        onClick={handleMenuOpenClick}
        aria-controls="share-button-menu"
        aria-haspopup="true"
      />

      <Menu
        id="share-button-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleMenuClose}
      >
        <CopyToClipboard text={getShareUrl()} onCopy={handleLinkCopy}>
          <MenuItem>
            <IconWrapper icon={BiLink} color="action">
              {t('action.copyLink')}
            </IconWrapper>
          </MenuItem>
        </CopyToClipboard>

        <Divider />

        {externalServices.map((item) => (
          <li key={item.name}>
            <MenuItem
              component="a"
              href={getShareUrl(item.name)}
              {...EXTERNAL_LINK_PROPS}
            >
              <IconWrapper icon={item.icon} customColor={item.color}>
                {item.name}
              </IconWrapper>
            </MenuItem>
          </li>
        ))}
      </Menu>
    </>
  );
};
