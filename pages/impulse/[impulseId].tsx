import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import {
  useImpulseQuery,
  ImpulseDocument,
  AgentAvatarFragment,
} from 'lib/graphql';
import { getPaginationProps } from 'util/graphql';
import { PageTransition, PageProgress } from 'components/common/page';
import { ContentSidebar } from 'components/common/sidebar';
import { Impulse } from 'components/network/content';
import { Alert } from 'components/common/misc';
import NotFoundPage from 'pages/404';

const ImpulsePage: NextPage<CommonPageProps & { id: string }> = ({
  id,
  setPageLayout,
}) => {
  const { error, data, loading, fetchMore } = useImpulseQuery({
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const impulse = data?.impulse;
  const teaserImage = impulse?.imagedBy.edges.map((item) => item.node)[0];

  /** @todo Remove additional filter/cast when mandatory fields are fixed. */
  const supporters = impulse
    ? (impulse.ratedBy.edges
        .map((item) => item.node.createdBy)
        .filter((item) => !!item) as AgentAvatarFragment[])
    : [];

  useEffect(() => {
    if (impulse)
      setPageLayout?.({
        sidebar: {
          content: (
            <ContentSidebar
              id={impulse.id}
              relevance={impulse.relevance}
              impulseAuthor={
                impulse.createdByGroup || impulse.createdByPerson || undefined
              }
              supporters={supporters}
              supportCount={impulse.ratedBy.count}
              relatedTopics={impulse.curatedBy.edges.map((item) => item.node)}
            />
          ),
          displayOnSmallScreens: 'pageEnd',
        },
      });
  }, [data]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;
  if (impulse === undefined) return <PageProgress />;
  if (impulse === null) return <NotFoundPage />;

  return (
    <>
      <NextSeo
        title={impulse.title}
        description={impulse.intro || undefined}
        openGraph={{
          type: 'article',
          title: impulse.title,
          images: teaserImage
            ? [{ url: teaserImage.resourceLocation }]
            : undefined,
        }}
      />

      <PageTransition>
        <Impulse
          data={impulse}
          commentPagination={getPaginationProps(impulse.commentedBy, {
            cursor: 'commentedByCursor',
            loading,
            fetchMore,
          })}
          groupPagination={getPaginationProps(impulse.coveredBy, {
            cursor: 'coveredByCursor',
            loading,
            fetchMore,
          })}
        />
      </PageTransition>
    </>
  );
};

export default ImpulsePage;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const id = `U:${ctx.query.impulseId}:Impulse`;

  return initializePageData(
    ctx,
    ['common'],
    {
      query: ImpulseDocument,
      variables: { id },
    },
    { id }
  );
};
