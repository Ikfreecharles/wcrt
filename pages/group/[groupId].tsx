import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box, Typography } from '@material-ui/core';
import { BiDoorOpen } from 'react-icons/bi';

import { CommonPageProps } from 'types';
import { initializePageData } from 'lib/server';
import { useTranslation } from 'lib/i18n';
import { useGroupQuery, GroupDocument, TopicTeaserFragment } from 'lib/graphql';
import { getPaginationProps } from 'util/graphql';
import { getInternalPath } from 'util/url';
import { PageProgress, PageTransition } from 'components/common/page';
import { ActionDisplay, Alert } from 'components/common/misc';
import { GroupProfile } from 'components/network/profile';
import { TopicCarousel } from 'components/network/content';
import { SidebarSection } from 'components/common/sidebar';
import { TextFormatter } from 'components/common/media';
import NotFoundPage from 'pages/404';
import { signIn, useSession } from 'lib/auth';
import { MembershipRequestDialog } from 'components/common/dialog';

const GroupProfilePage: NextPage<CommonPageProps & { id: string }> = ({
  id,
  setPageLayout,
}) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const { loading, error, data, fetchMore } = useGroupQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });
  const [requesting, setRequesting] = useState(false);

  const profile = data?.group;
  const topics =
    profile?.createsTopic.edges.map(
      (edge) => edge.node as TopicTeaserFragment
    ) || [];

  const handleParticipateClick = () => setRequesting(true);

  useEffect(() => {
    if (profile)
      setPageLayout?.({
        sidebar: {
          content: (
            <>
              <Box mb={[2, 2, 4]}>
                {profile._viewer.administeredBy.count > 0 ? (
                  <ActionDisplay
                    icon={BiDoorOpen}
                    text={t('explain.group.ownMembership', {
                      group: profile.name,
                    })}
                    buttonLabel={t('action.goToInternalView')}
                    buttonHref={getInternalPath(id)}
                  />
                ) : (
                  <>
                    <ActionDisplay
                      icon={BiDoorOpen}
                      text={t('explain.group.membershipRequest', {
                        group: profile.name,
                      })}
                      buttonLabel={t('action.participate')}
                      buttonOnClick={session ? handleParticipateClick : signIn}
                    />

                    <MembershipRequestDialog
                      groupId={id}
                      open={requesting}
                      setOpen={setRequesting}
                    />
                  </>
                )}
              </Box>

              {profile.contactInfo && (
                <SidebarSection title={t('label.contact')}>
                  <Typography variant="body2" paragraph>
                    <TextFormatter autoLink>
                      {profile.contactInfo}
                    </TextFormatter>
                  </Typography>
                </SidebarSection>
              )}

              {topics.length > 0 && (
                <SidebarSection title={t('label.currentTopics')}>
                  <TopicCarousel topics={topics} />
                </SidebarSection>
              )}
            </>
          ),
          displayOnSmallScreens: 'pageEnd',
        },
      });
  }, [data, t, requesting]);

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
        <GroupProfile
          data={profile}
          articlePagination={getPaginationProps(data?.group?.createsArticle, {
            cursor: 'createsArticleCursor',
            loading,
            fetchMore,
          })}
        />
      </PageTransition>
    </>
  );
};

export default GroupProfilePage;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  const id = `U:${ctx.query.groupId}:Group`;

  return initializePageData(
    ctx,
    ['common'],
    {
      query: GroupDocument,
      variables: { id },
    },
    { id }
  );
};
