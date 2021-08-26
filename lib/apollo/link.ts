import { ApolloLink } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';

import { accessTokenVar } from 'lib/variables';

/** Create a custom link with our authoriziation configuration. */
export const createAuthLink = () =>
  new ApolloLink((operation, forward) => {
    const accessToken = accessTokenVar();

    if (accessToken)
      operation.setContext({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    return forward(operation);
  });

/** Create a custom link with our error handling. */
export const createErrorLink = () =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

/** Create a custom HTTP link. */
export const createHttpLink = () =>
  new BatchHttpLink({
    uri: process.env.NEXT_PUBLIC_GATEWAY_URL,
  });
