import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Grid } from '@material-ui/core';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import {
  ArticleTeaserFragment,
  CommentTeaserFragment,
  ContentTeaserFragment,
  GroupTeaserFragment,
  ImpulseTeaserFragment,
  TopicTeaserFragment,
} from 'lib/graphql';
import { isDataOfType } from 'util/type';
import { InlineProgress, Alert } from 'components/common/misc';
import {
  ArticleTeaser,
  CommentTeaser,
  ImpulseTeaser,
  TopicTeaser,
} from 'components/network/content';
import { GroupTeaser, InternalGroupTeaser } from 'components/network/profile';

type Props = {
  /** A list of various teaser data */
  items: (
    | ContentTeaserFragment
    | CommentTeaserFragment
    | GroupTeaserFragment
  )[];
  /** Use internal group teasers */
  internal?: boolean;
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** A custom element to show when the item list is empty */
  emptyState?: JSX.Element;
  /** The action to perform on reset button click */
  reset?: () => void;
};

/**
 * Renders various teaser components as a unified content stream. Is able to
 * determine the appropriate teaser components and optionally includes a
 * scroll-based pagination.
 */
export const Feed: React.FC<Props> = ({
  items,
  internal,
  pagination,
  emptyState,
  reset,
}) => {
  const { t } = useTranslation();
  const [autoLoading, setAutoLoading] = useState(false);
  const [lastItemEl, lastItemIsVisible] = useInView();

  const handleButtonClick = () => {
    pagination?.fetchMore?.();
    setAutoLoading(true);
  };

  useEffect(() => {
    if (autoLoading && lastItemIsVisible) pagination?.fetchMore();
  }, [lastItemIsVisible]);

  return items.length ? (
    <Grid container spacing={2} role="feed">
      {items.map((item, index) => (
        <Grid
          item
          xs={12}
          ref={index === items.length - 1 ? lastItemEl : undefined}
          key={item.id}
        >
          {isDataOfType<ArticleTeaserFragment>(item, 'Article') && (
            <ArticleTeaser data={item} />
          )}

          {isDataOfType<ImpulseTeaserFragment>(item, 'Impulse') && (
            <ImpulseTeaser data={item} />
          )}

          {isDataOfType<TopicTeaserFragment>(item, 'Topic') && (
            <TopicTeaser data={item} />
          )}

          {isDataOfType<CommentTeaserFragment>(item, 'Comment') && (
            <CommentTeaser data={item} />
          )}

          {isDataOfType<GroupTeaserFragment>(item, 'Group') &&
            (internal ? (
              <InternalGroupTeaser data={item} />
            ) : (
              <GroupTeaser data={item} />
            ))}
        </Grid>
      ))}

      {pagination?.hasMore && (
        <Grid item xs={12}>
          {pagination?.loading || autoLoading ? (
            <InlineProgress />
          ) : (
            <Button color="primary" fullWidth onClick={handleButtonClick}>
              {t('action.showMore')}
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  ) : (
    emptyState || (
      <Alert
        type="notFound"
        message={t('explain.feedEmpty')}
        buttonLabel={t('action.reset')}
        onClick={reset}
      />
    )
  );
};
