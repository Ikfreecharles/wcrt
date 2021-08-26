import lowerFirst from 'lodash/lowerFirst';

import { useTranslation } from 'lib/i18n';
import { useMyCommentsQuery } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/** Renders an entity list prepopulated with the comments associated with my own account. */
export const AccountCommentList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, fetchMore } = useMyCommentsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const listItems =
    data?.me.represents?.createsComment.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, comments }) => {
        const timestamp = t('format.dateTime', {
          date: createdAt,
        });

        if (!comments) return { id, subtitle: timestamp };

        return {
          id,
          title: `${t(`content.type.${lowerFirst(comments.__typename)}`)}: ${
            comments.title
          }`,
          subtitle: timestamp,
          url: getEntityPath(comments.id),
        };
      }) || [];

  return (
    <EntityList
      deletable
      items={listItems}
      pagination={getPaginationProps(data?.me.represents?.createsComment, {
        loading,
        fetchMore,
      })}
    />
  );
};
