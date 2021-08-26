import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { createCache } from 'lib/apollo/cache';
import {
  createAuthLink,
  createErrorLink,
  createHttpLink,
} from 'lib/apollo/link';
import { isServerSide } from 'util/env';

let globalApolloClient: ApolloClient<NormalizedCacheObject>;

/** Create a custom Apollo Client. */
const createApolloClient = () =>
  new ApolloClient({
    ssrMode: isServerSide,
    link: ApolloLink.from([
      createAuthLink(),
      createErrorLink(),
      createHttpLink(),
    ]),
    cache: createCache(),
    defaultOptions: {
      watchQuery: {
        /**
         * When running client-side always fetch the latest data on the initial
         * query and watch the cache when refetching the same query.
         *
         * https://github.com/apollographql/apollo-client/issues/6760#issuecomment-668188727
         */
        fetchPolicy: isServerSide ? 'cache-only' : 'cache-and-network',
        nextFetchPolicy: isServerSide ? 'cache-only' : 'cache-first',
      },
    },
    // Allow SSR prefetching when using `network-only` fetch policy.
    ssrForceFetchDelay: 100,
  });

/** Initialize an Apollo Client with previously prepared cache content. */
export const initializeApollo = (initialState?: NormalizedCacheObject) => {
  let apolloClient: ApolloClient<NormalizedCacheObject>;

  if (isServerSide) {
    // Always create a new Apollo Client instance.
    apolloClient = createApolloClient();
  } else {
    if (globalApolloClient) {
      // Reuse the Apollo Client to maintain the cache.
      apolloClient = globalApolloClient;
    } else {
      // Create a new Apollo Client instance.
      apolloClient = createApolloClient();

      // Save the Apollo Client instance for subsequent function calls.
      globalApolloClient = apolloClient;
    }
  }

  // Restore the cache by merging existing and prefetched data.
  if (initialState)
    apolloClient.cache.restore({ ...apolloClient.extract(), ...initialState });

  return apolloClient;
};

/** A dummy client to use when we do not want to emit any queries. */
export const dummyApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
});
