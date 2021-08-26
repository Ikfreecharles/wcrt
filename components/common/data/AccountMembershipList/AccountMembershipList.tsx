import { useTranslation } from 'lib/i18n';
import { useMyMembershipsQuery } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/**
 * Renders an entity list prepopulated with the group memberships associated
 * with my own account.
 */
export const AccountMembershipList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, fetchMore } = useMyMembershipsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const listItems =
    data?.me.ownsMembership.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, administers }) => ({
        id: id,
        title: administers?.name,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: administers ? getEntityPath(administers.id) : undefined,
      })) || [];

  return (
    <EntityList
      deletable
      items={listItems}
      pagination={getPaginationProps(data?.me.ownsMembership, {
        loading,
        fetchMore,
      })}
    />
  );
};
