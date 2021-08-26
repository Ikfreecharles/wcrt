import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { useFeedQuery, FeedDocument } from 'lib/graphql';
import { useFeedFilters } from 'hooks/feed';
import { extractQueryParameters } from 'util/url';
import { buildFeedQueryVariables, getPaginationProps } from 'util/graphql';
import { PageProgress, PageTransition } from 'components/common/page';
import { Alert } from 'components/common/misc';
import { Feed } from 'components/common/data';
import { FeedSidebar } from 'components/common/sidebar';

const IndexPage: NextPage<CommonPageProps> = ({ setPageLayout }) => {
  const { t } = useTranslation();
  const {
    filters,
    setNewFilters,
    filtersPending,
    applyNewFilters,
    resetFilters,
  } = useFeedFilters();
  const { loading, error, data, fetchMore } = useFeedQuery({
    notifyOnNetworkStatusChange: true,
    variables: buildFeedQueryVariables(filters),
  });

  const feedContents = data ? data.feeds.edges.map((item) => item.node) : [];

  useEffect(() => {
    setPageLayout?.({
      sidebar: !error
        ? {
            content: (
              <FeedSidebar
                filters={filters}
                setFilters={setNewFilters}
                loading={filtersPending}
              />
            ),
            displayOnSmallScreens: 'pageStart',
          }
        : undefined,
    });
  }, [data, error, filters, filtersPending]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;

  return (
    <>
      <NextSeo
        title={t('page.index.title')}
        openGraph={{
          title: t('page.index.title'),
        }}
      />

      {data ? (
        <PageTransition hidden={filtersPending} onHidden={applyNewFilters}>
          <Feed
            items={feedContents}
            pagination={getPaginationProps(data?.feeds, { loading, fetchMore })}
            reset={resetFilters}
          />
        </PageTransition>
      ) : (
        <PageProgress />
      )}
    </>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common'], {
    query: FeedDocument,
    variables: buildFeedQueryVariables(
      extractQueryParameters(ctx.query, ['type', 'category', 'location'])
    ),
  });
