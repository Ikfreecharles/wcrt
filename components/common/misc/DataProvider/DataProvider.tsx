import { useEffect, useMemo } from 'react';
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client';

import { accessTokenVar } from 'lib/variables';
import { useSession } from 'lib/auth';
import { initializeApollo, dummyApolloClient } from 'lib/apollo';
import { useMessagingConnection } from 'hooks/messaging';

type Props = {
  /** The initial state of the Apollo Client cache (from SSR) */
  state?: NormalizedCacheObject;
};

/**
 * Provides context for the Apollo Client, handles access token updates and
 * initializes the messaging connection for chats and notfications.
 */
export const DataProvider: React.FC<Props> = ({ state, children }) => {
  const [session, sessionLoading] = useSession();
  const apolloClient = useMemo(() => initializeApollo(state), [state]);
  const { initializeMessagingStream, closeMessagingStream } =
    useMessagingConnection(apolloClient);

  const accessToken = session?.account.accessToken || null;

  useEffect(() => {
    accessTokenVar(accessToken);
    if (accessToken) initializeMessagingStream();

    return () => closeMessagingStream();
  }, [accessToken]);

  return (
    <ApolloProvider
      // We do not want to fire any queries until the session is loaded.
      client={!sessionLoading || state ? apolloClient : dummyApolloClient}
    >
      {children}
    </ApolloProvider>
  );
};
