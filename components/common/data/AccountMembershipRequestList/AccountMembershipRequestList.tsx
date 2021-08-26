import { useTranslation } from 'lib/i18n';
import { useMyMembershipRequestsQuery } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/**
 * Renders an entity list prepopulated with the membership invites associated
 * with my own account.
 */
export const AccountMembershipRequestList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, fetchMore } = useMyMembershipRequestsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const listItems =
    data?.me.ownsMembershipRequest.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, receivedBy }) => ({
        id: id,
        title: receivedBy?.name,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: receivedBy ? getEntityPath(receivedBy.id) : undefined,
      })) || [];

  return (
    <EntityList
      deletable
      items={listItems}
      pagination={getPaginationProps(data?.me.ownsMembershipRequest, {
        loading,
        fetchMore,
      })}
    />
  );
};
