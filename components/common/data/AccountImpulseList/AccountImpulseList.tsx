import { useTranslation } from 'lib/i18n';
import { useMyImpulsesQuery } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/** Renders an entity list prepopulated with the impulses associated with my own account. */
export const AccountImpulseList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, fetchMore } = useMyImpulsesQuery({
    notifyOnNetworkStatusChange: true,
  });

  const listItems =
    data?.me.represents?.createsContent.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, title }) => ({
        id,
        title,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: getEntityPath(id),
      })) || [];

  return (
    <EntityList
      editable
      deletable
      items={listItems}
      pagination={getPaginationProps(data?.me.represents?.createsContent, {
        loading,
        fetchMore,
      })}
    />
  );
};
