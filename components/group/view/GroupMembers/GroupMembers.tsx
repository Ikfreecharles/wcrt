import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Chip, Grid } from '@material-ui/core';
import { BiUserPlus } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import {
  useGroupMembershipInvitesQuery,
  useGroupMembershipRequestsQuery,
} from 'lib/graphql';
import { GroupContext } from 'context/group';
import { getInternalPath } from 'util/url';
import { GroupWindow } from 'components/group/misc';
import { GroupMemberList } from 'components/group/data';
import { GroupEntityCreateButton } from 'components/group/control';

/** Renders an overview of the group members. Meant to be used within a group context. */
export const GroupMembers: React.FC = () => {
  const { t } = useTranslation();
  const { groupId, viewerRole } = useContext(GroupContext);
  const { data: invitesData } = useGroupMembershipInvitesQuery({
    variables: { id: groupId },
  });
  const { data: requestsData } = useGroupMembershipRequestsQuery({
    variables: { id: groupId },
  });

  const invitesCount =
    invitesData?.group?.managesMembershipInvite.count || null;
  const requestsCount = requestsData?.group?.receives.count || null;

  return (
    <GroupWindow
      title={t('group:tool.members.title')}
      footer={
        viewerRole === 'admin' && (
          <GroupEntityCreateButton
            icon={BiUserPlus}
            label={t('group:action.addMembers')}
            href="/members/add"
          />
        )
      }
      noPadding
      bottomGutter={11}
    >
      {viewerRole === 'admin' && (requestsCount || invitesCount) && (
        <Box px={2} py={1} bgcolor="action.selected">
          <Grid container spacing={1}>
            {requestsCount && (
              <Grid item>
                <NextLink
                  href={getInternalPath(groupId, '/members/requests')}
                  passHref
                >
                  <Chip
                    component="a"
                    color="secondary"
                    label={t('count.membershipRequest', {
                      count: requestsCount,
                    })}
                  />
                </NextLink>
              </Grid>
            )}

            {invitesCount && (
              <Grid item>
                <NextLink
                  href={getInternalPath(groupId, '/members/invites')}
                  passHref
                >
                  <Chip
                    component="a"
                    color="primary"
                    variant="outlined"
                    label={t('count.invite', {
                      count: invitesCount,
                    })}
                  />
                </NextLink>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      <GroupMemberList />
    </GroupWindow>
  );
};
