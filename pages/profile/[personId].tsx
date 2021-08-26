import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import {
  usePersonQuery,
  PersonDocument,
  GroupTeaserFragment,
} from 'lib/graphql';
import { getPaginationProps } from 'util/graphql';
import { PageProgress, PageTransition } from 'components/common/page';
import { Alert } from 'components/common/misc';
import { PersonProfile } from 'components/network/profile';
import { GroupsSection } from 'components/common/sidebar';
import NotFoundPage from 'pages/404';

const PersonProfilePage: NextPage<CommonPageProps & { id: string }> = ({
  id,
  setPageLayout,
}) => {
  const { loading, error, data, fetchMore } = usePersonQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  const profile = data?.person;

  /** @todo Remove additional filter/cast when mandatory fields are fixed. */
  const groups =
    data?.person?.representedBy?.ownsMembership.edges
      .map((edge) => edge.node.administers)
      .filter((item): item is GroupTeaserFragment => !!item) || [];

  useEffect(() => {
    if (profile)
      setPageLayout?.({
        sidebar: {
          content: <GroupsSection items={groups} />,
          displayOnSmallScreens: 'pageEnd',
        },
      });
  }, [data]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;
  if (profile === undefined) return <PageProgress />;
  if (profile === null) return <NotFoundPage />;

  return (
    <>
      <NextSeo
        title={profile.name}
        description={profile.intro || undefined}
        openGraph={{
          type: 'profile',
          title: profile.name,
          images: profile.imagedBy
            ? [{ url: profile.imagedBy.resourceLocation }]
            : undefined,
        }}
      />

      <PageTransition>
        <PersonProfile
          data={profile}
          contentPagination={getPaginationProps(data?.person?.createsContent, {
            cursor: 'createsContentCursor',
            loading,
            fetchMore,
          })}
          commentPagination={getPaginationProps(data?.person?.createsComment, {
            cursor: 'createsCommentCursor',
            loading,
            fetchMore,
          })}
          ratingPagination={getPaginationProps(data?.person?.createsRating, {
            cursor: 'createsRatingCursor',
            loading,
            fetchMore,
          })}
        />
      </PageTransition>
    </>
  );
};

export default PersonProfilePage;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const id = `U:${ctx.query.personId}:Person`;

  return initializePageData(
    ctx,
    ['common'],
    {
      query: PersonDocument,
      variables: { id },
    },
    { id }
  );
};
