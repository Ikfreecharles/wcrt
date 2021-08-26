import { ApolloClient, DocumentNode } from '@apollo/client/core';
import {
  QueryHookOptions,
  LazyQueryHookOptions,
  QueryLazyOptions,
  MutationHookOptions,
  MutationFunctionOptions,
} from '@apollo/client/react';

import { apollo } from 'testing/util';

export { ApolloClient } from '@apollo/client/core';
export { gql, makeVar } from '@apollo/client/core';
export { InMemoryCache } from '@apollo/client/cache';
export { ApolloError } from '@apollo/client/errors';
export { useReactiveVar } from '@apollo/client/react';

export const useApolloClient = () => new ApolloClient({ cache: apollo.cache });

export const useQuery = (
  query: DocumentNode,
  { skip, onCompleted, variables }: QueryHookOptions = {}
) => {
  if (!skip) onCompleted?.(apollo.response);

  return {
    data: skip ? undefined : apollo.response,
    client: useApolloClient(),
    refetch: () => {
      apollo.refetch(query, variables);
      return { data: apollo.response };
    },
  };
};

export const useLazyQuery = (
  query: DocumentNode,
  { onCompleted, variables: hookVariables }: LazyQueryHookOptions = {}
) => [
  ({ variables }: QueryLazyOptions<Record<string, unknown>> = {}) =>
    new Promise(() => {
      apollo.lazyQuery(query, { hookVariables, ...variables });
      onCompleted?.(apollo.response);
    }),
  { data: apollo.response, client: useApolloClient() },
];

export const useMutation = (
  mutation: DocumentNode,
  { onCompleted, variables: hookVariables }: MutationHookOptions = {}
) => [
  ({ variables }: MutationFunctionOptions = {}) =>
    new Promise((resolve) => {
      apollo.mutate(mutation, { ...hookVariables, ...variables });
      onCompleted?.(apollo.response);
      resolve({ data: apollo.response });
    }),
  { client: useApolloClient() },
];
