import { useContext } from 'react';
import { ListItemAvatar } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { useGroupMembershipInvitesQuery } from 'lib/graphql';
import { GroupContext } from 'context/group';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';
import { Avatar } from 'components/network/profile';

/**
 * Renders an entity list prepopulated with the membership invites of a group.
 * Meant to be used within a group context.
 */
export const GroupMemberInviteList: React.FC = () => {
  const { t } = useTranslation();
  const { groupId, viewerRole } = useContext(GroupContext);
  const { loading, data, fetchMore } = useGroupMembershipInvitesQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: groupId,
    },
  });

  const listItems =
    data?.group?.managesMembershipInvite.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, receivedBy }) => ({
        id,
        leadingElement: (
          <ListItemAvatar>
            <Avatar data={receivedBy?.represents} />
          </ListItemAvatar>
        ),
        title: receivedBy?.represents?.name,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: receivedBy?.represents
          ? getEntityPath(receivedBy.represents.id)
          : undefined,
      })) || [];

  return (
    <EntityList
      deletable={viewerRole === 'admin'}
      items={listItems}
      pagination={getPaginationProps(data?.group?.managesMembershipInvite, {
        loading,
        fetchMore,
      })}
      loadingSkeleton
    />
  );
};
