import lowerFirst from 'lodash/lowerFirst';

import { useTranslation } from 'lib/i18n';
import { useMyRatingsQuery } from 'lib/graphql';
import { hasProperty } from 'util/type';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';

/** Renders an entity list prepopulated with the ratings associated with my own account. */
export const AccountRatingList: React.FC = () => {
  const { t } = useTranslation();
  const { loading, data, fetchMore } = useMyRatingsQuery({
    notifyOnNetworkStatusChange: true,
  });

  const listItems =
    data?.me.represents?.createsRating.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, rates }) => {
        const timestamp = t('format.dateTime', {
          date: createdAt,
        });

        // ContentRating
        if (hasProperty(rates, 'title'))
          return {
            id,
            title: `${t(`content.type.${lowerFirst(rates.__typename)}`)}: ${
              rates.title
            }`,
            subtitle: timestamp,
            url: getEntityPath(rates.id),
          };

        // CommentRating
        if (
          hasProperty(rates, 'comments') &&
          hasProperty(rates.comments, 'title')
        )
          return {
            id,
            title: `${t('label.reply')}: ${rates.comments.title}`,
            subtitle: timestamp,
            url: getEntityPath(rates.comments.id),
          };

        return { id, subtitle: timestamp };
      }) || [];

  return (
    <EntityList
      deletable
      items={listItems}
      pagination={getPaginationProps(data?.me.represents?.createsRating, {
        loading,
        fetchMore,
      })}
    />
  );
};
