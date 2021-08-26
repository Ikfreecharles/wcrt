import NextLink from 'next/link';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@material-ui/core';
import { BiCog, BiExit } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useGroupQuery } from 'lib/graphql';
import { useGroupNavigation } from 'hooks/navigation';
import { getEntityPath, getInternalPath } from 'util/url';
import { getViewerGroupRole } from 'util/data';
import { IconButton } from 'components/common/control';
import { Signature } from 'components/network/profile';

type Props = {
  /** The group ID */
  groupId: string;
};

/** Renders the group navigation with profile data and links to the group tools. */
export const GroupNavigation: React.FC<Props> = ({ groupId }) => {
  const { t } = useTranslation();
  const menuItems = useGroupNavigation(groupId);
  const { data } = useGroupQuery({ variables: { id: groupId } });

  const profile = data?.group || undefined;
  const viewerRole = getViewerGroupRole(profile);

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        {profile && <Signature data={profile} />}

        <Box display="flex" ml={1} mr={-1.5} my={-0.5}>
          <NextLink href={getEntityPath(groupId)} passHref>
            <IconButton
              title={t('group:label.publicGroupProfile')}
              icon={BiExit}
            />
          </NextLink>

          {viewerRole === 'admin' && (
            <NextLink href={getInternalPath(groupId, '/settings')} passHref>
              <IconButton title={t('group:label.groupSettings')} icon={BiCog} />
            </NextLink>
          )}
        </Box>
      </Box>

      <Divider />

      <Box py={2}>
        <List
          component="nav"
          disablePadding
          aria-label={t('group:label.groupTools')}
        >
          {menuItems.map(({ icon, label, path, isActive, disabled }) => (
            <NextLink href={path} passHref key={path}>
              <ListItem
                button
                component="a"
                href={path}
                selected={isActive}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemIcon>
                  <SvgIcon component={icon} />
                </ListItemIcon>

                <ListItemText
                  primary={label}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                />
              </ListItem>
            </NextLink>
          ))}
        </List>
      </Box>
    </>
  );
};
