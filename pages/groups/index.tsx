import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { BiCompass, BiHomeHeart } from 'react-icons/bi';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { useSession } from 'lib/auth';
import {
  GroupsDocument,
  useGroupsQuery,
  useMessagingStatsQuery,
} from 'lib/graphql';
import { useFeedFilters } from 'hooks/feed';
import { extractQueryParameters } from 'util/url';
import { buildFeedQueryVariables, getPaginationProps } from 'util/graphql';
import { PageProgress, PageTransition } from 'components/common/page';
import { Alert } from 'components/common/misc';
import { Feed } from 'components/common/data';
import { FeedSidebar } from 'components/common/sidebar';

const GroupsPage: NextPage<CommonPageProps> = ({ setPageLayout }) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [filterMembership, setFilterMembership] = useState(true);
  const {
    filters,
    setNewFilters,
    filtersPending,
    applyNewFilters,
    resetFilters,
  } = useFeedFilters(['category', 'location']);
  const { loading, error, data, fetchMore } = useGroupsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      ...buildFeedQueryVariables(filters),
      onlineAccounts:
        session && filterMembership ? [session.account.id] : undefined,
    },
  });
  const { data: messagingData } = useMessagingStatsQuery();

  const groups = data ? data.groups.edges.map((item) => item.node) : [];

  useEffect(() => {
    setPageLayout?.({
      sidebar: !error
        ? {
            content: (
              <FeedSidebar
                filters={filters}
                setFilters={setNewFilters}
                loading={filtersPending}
                label={t('count.group', { count: data?.groups.count || 0 })}
              />
            ),
            displayOnSmallScreens: 'pageStart',
          }
        : undefined,
      tabNavigation: session
        ? {
            value: filterMembership ? 0 : 1,
            setValue: (value) =>
              setFilterMembership(value === 0 ? true : false),
            tabs: [
              {
                icon: BiHomeHeart,
                label: t('label.myGroups'),
                hasActivity: !!messagingData?.messagingStats?.unreadCount,
              },
              {
                icon: BiCompass,
                label: t('action.discover'),
              },
            ],
          }
        : undefined,
    });
  }, [
    data,
    error,
    filters,
    filtersPending,
    session,
    filterMembership,
    messagingData,
  ]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;

  return (
    <>
      <NextSeo
        title={t('page.groups.title')}
        openGraph={{
          title: t('page.groups.title'),
        }}
      />

      {data ? (
        <PageTransition hidden={filtersPending} onHidden={applyNewFilters}>
          <Feed
            items={groups}
            pagination={getPaginationProps(data?.groups, {
              loading,
              fetchMore,
            })}
            reset={resetFilters}
            internal={!!(session && filterMembership)}
          />
        </PageTransition>
      ) : (
        <PageProgress />
      )}
    </>
  );
};

export default GroupsPage;

export const getServerSideProps: GetServerSideProps = (ctx) =>
  initializePageData(ctx, ['common'], {
    query: GroupsDocument,
    variables: buildFeedQueryVariables(
      extractQueryParameters(ctx.query, ['category', 'location'])
    ),
  });
