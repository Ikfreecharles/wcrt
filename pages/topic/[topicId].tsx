import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Typography } from '@material-ui/core';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { useTopicQuery, TopicDocument, TopicTeaserFragment } from 'lib/graphql';
import { PageProgress, PageTransition } from 'components/common/page';
import { Alert } from 'components/common/misc';
import { SidebarSection } from 'components/common/sidebar';
import { Topic, TopicCarousel } from 'components/network/content';
import { Signature } from 'components/network/profile';
import NotFoundPage from 'pages/404';

const TopicPage: NextPage<CommonPageProps & { id: string }> = ({
  id,
  setPageLayout,
}) => {
  const { t } = useTranslation();
  const { error, data } = useTopicQuery({
    variables: { id },
  });

  const topic = data?.topic;
  const teaserImage = topic?.imagedBy.edges.map((item) => item.node)[0];
  const author = topic?.createdByGroup;
  const moreTopics = topic?.createdByGroup?.creates.edges
    .map((item) => item.node as TopicTeaserFragment)
    .filter((item) => item.id !== id);

  useEffect(() => {
    if (topic)
      setPageLayout?.({
        sidebar: {
          content: (
            <>
              {author && (
                <SidebarSection title={t('label.curator')}>
                  <Signature data={author} />

                  {author.intro && (
                    <Box mt={2}>
                      <Typography variant="body2">{author.intro}</Typography>
                    </Box>
                  )}
                </SidebarSection>
              )}

              {moreTopics && moreTopics.length > 0 && (
                <SidebarSection title={t('label.moreTopics')}>
                  <TopicCarousel topics={moreTopics} />
                </SidebarSection>
              )}
            </>
          ),
          displayOnSmallScreens: 'pageEnd',
        },
      });
  }, [data, t]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (error) return <Alert type="remoteError" info={error.message} />;
  if (topic === undefined) return <PageProgress />;
  if (topic === null) return <NotFoundPage />;

  return (
    <>
      <NextSeo
        title={topic.title}
        description={topic.intro || undefined}
        openGraph={{
          type: 'article',
          title: topic.title,
          images: teaserImage
            ? [{ url: teaserImage.resourceLocation }]
            : undefined,
        }}
      />

      <PageTransition>
        <Topic data={topic} />
      </PageTransition>
    </>
  );
};

export default TopicPage;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const id = `U:${ctx.query.topicId}:Topic`;

  return initializePageData(
    ctx,
    ['common'],
    {
      query: TopicDocument,
      variables: { id },
    },
    { id }
  );
};
