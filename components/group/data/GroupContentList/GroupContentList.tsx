import { useContext } from 'react';

import { useTranslation } from 'lib/i18n';
import { useGroupContentsQuery } from 'lib/graphql';
import { GroupContext } from 'context/group';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/**
 * Renders an entity list prepopulated with the contents of a group. Meant to be
 * used within a group context.
 */
export const GroupContentList: React.FC = () => {
  const { t } = useTranslation();
  const { groupId } = useContext(GroupContext);
  const { loading, data, fetchMore } = useGroupContentsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: groupId,
    },
  });

  const listItems =
    data?.group?.managesContent.edges
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
      pagination={getPaginationProps(data?.group?.managesContent, {
        loading,
        fetchMore,
      })}
      loadingSkeleton
    />
  );
};
