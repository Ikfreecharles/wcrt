import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from '@material-ui/core';

import { useGroupQuery } from 'lib/graphql';
import { GroupProvider } from 'context/group';
import { getViewerGroupRole } from 'util/data';
import { GroupNavigation } from 'components/group/misc';
import { CommonPageProps } from 'types';
import { useUnauthenticatedRedirect } from 'hooks/init';
import { Alert } from 'components/common/misc';
import { PageProgress } from 'components/common/page';
import NotFoundPage from 'pages/404';

/**
 * Provides navigation and the context for a group. Meant to be used as wrapper
 * for internal group pages.
 */
export const GroupPageWrapper: React.FC<CommonPageProps> = ({
  setPageLayout,
  children,
}) => {
  const { query } = useRouter();
  const { error, data } = useGroupQuery({
    variables: { id: `U:${query.groupId}:Group` },
  });

  const profile = data?.group;

  useEffect(() => {
    if (profile)
      setPageLayout?.({
        sidebar: {
          content: (
            <Card variant="outlined">
              <GroupNavigation groupId={profile.id} />
            </Card>
          ),
          displayOnSmallScreens: null,
        },
      });
  }, [data]);

  // Reset the layout config on page leave.
  useEffect(() => () => setPageLayout?.(null), []);

  if (
    useUnauthenticatedRedirect(
      '/groups',
      profile ? !profile._viewer.administeredBy.count : undefined
    )
  )
    return null;

  if (error) return <Alert type="remoteError" info={error.message} />;
  if (profile === undefined) return <PageProgress />;
  if (profile === null) return <NotFoundPage />;

  return (
    <GroupProvider
      value={{
        groupId: profile.id,
        groupName: profile.name,
        chatChannel: profile.chatChannel,
        viewerRole: getViewerGroupRole(profile),
      }}
    >
      {children}
    </GroupProvider>
  );
};

/** Adds the wrapper component to a page component. */
export const withGroupContext = (PageComponent: React.FC) => {
  const GroupContextPage: typeof GroupPageWrapper = ({
    children,
    ...props
  }) => (
    <GroupPageWrapper {...props}>
      <PageComponent>{children}</PageComponent>
    </GroupPageWrapper>
  );

  return GroupContextPage;
};
