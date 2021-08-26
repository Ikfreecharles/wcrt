import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import {
  useArticleQuery,
  ArticleDocument,
  AgentAvatarFragment,
} from 'lib/graphql';
import { getPaginationProps } from 'util/graphql';
import { PageProgress, PageTransition } from 'components/common/page';
import { Alert } from 'components/common/misc';
import { ContentSidebar } from 'components/common/sidebar';
import { Article } from 'components/network/content';
import NotFoundPage from 'pages/404';

const ArticlePage: NextPage<CommonPageProps & { id: string }> = ({
  id,
  setPageLayout,
}) => {
  const { loading, error, data, fetchMore } = useArticleQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  const article = data?.article;
  const teaserImage =
    article && article.imagedBy.edges.map((item) => item.node)[0];

  /** @todo Remove additional filter/cast when mandatory fields are fixed. */
  const supporters = article
    ? (article.ratedBy.edges
        .map((item) => item.node.createdBy)
        .filter((item) => !!item) as AgentAvatarFragment[])
    : [];

  /** @todo Remove additional filter/cast when mandatory fields are fixed. */
  const comments = article
    ? article.commentedBy.edges
        .map((item) => item.node)
        .filter((item) => !!item.createdBy)
    : [];

  useEffect(() => {
    if (article)
      setPageLayout?.({
        sidebar: {
          content: (
            <ContentSidebar
              id={article.id}
              supporters={supporters}
              supportCount={article.ratedBy.count}
              comments={comments}
              commentCount={article.commentedBy.count}
              commentPagination={getPaginationProps(
                data?.article?.commentedBy,
                {
                  cursor: 'commentedByCursor',
                  loading,
                  fetchMore,
                }
              )}
              relatedTopics={article.curatedBy.edges.map((item) => item.node)}
            />
          ),
          displayOnSmallScreens: 'pageEnd',
        },
      });
  }, [data, loading]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;
  if (article === undefined) return <PageProgress />;
  if (article === null) return <NotFoundPage />;

  return (
    <>
      <NextSeo
        title={article.title}
        description={article.intro || undefined}
        openGraph={{
          type: 'article',
          title: article.title,
          images: teaserImage
            ? [{ url: teaserImage.resourceLocation }]
            : undefined,
        }}
      />

      <PageTransition>
        <Article data={article} />
      </PageTransition>
    </>
  );
};

export default ArticlePage;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const id = `U:${ctx.query.articleId}:Article`;

  return initializePageData(
    ctx,
    ['common'],
    {
      query: ArticleDocument,
      variables: { id },
    },
    { id }
  );
};
