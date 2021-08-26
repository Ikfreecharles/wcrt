import { useContext } from 'react';
import { ListItemAvatar } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { useGroupMembersQuery } from 'lib/graphql';
import { GroupContext } from 'context/group';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';
import { Avatar } from 'components/network/profile';

/**
 * Renders an entity list prepopulated with the members of a group. Meant to be
 * used within a group context.
 */
export const GroupMemberList: React.FC = () => {
  const { t } = useTranslation();
  const { groupId, viewerRole } = useContext(GroupContext);
  const { loading, data, fetchMore } = useGroupMembersQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: groupId,
    },
  });

  const listItems =
    data?.group?.administeredBy.edges
      .map((edge) => edge.node)
      .map(({ id, definedBy, ownedBy }) => ({
        id,
        leadingElement: (
          <ListItemAvatar>
            <Avatar data={ownedBy?.represents} />
          </ListItemAvatar>
        ),
        title: ownedBy?.represents?.name,
        subtitle: t(`role.${definedBy?.name}`),
        url: ownedBy?.represents
          ? getEntityPath(ownedBy.represents.id)
          : undefined,
      })) || [];

  return (
    <EntityList
      deletable={viewerRole === 'admin'}
      items={listItems}
      pagination={getPaginationProps(data?.group?.administeredBy, {
        loading,
        fetchMore,
      })}
      loadingSkeleton
    />
  );
};
