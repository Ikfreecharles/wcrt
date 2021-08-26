import {
  ApolloError,
  ObservableQueryFields,
  WatchQueryFetchPolicy,
} from '@apollo/client';
import upperFirst from 'lodash/upperFirst';

import { CommonPaginationProps, FeedFilters } from 'types';
import { FeedQueryVariables, FeedType, PageInfo } from 'lib/graphql';

/** Returns a `cache-first` fetch policy for non-testing environments. */
export const getOptimizedFetchPolicy = () => ({
  fetchPolicy: (process.env.NODE_ENV !== 'test'
    ? 'cache-first'
    : undefined) as WatchQueryFetchPolicy,
});

/** Returns pagination properties for a specific query. */
export const getPaginationProps = <
  T extends { pageInfo: Partial<PageInfo> | undefined } | undefined,
  F extends ObservableQueryFields<unknown, unknown>['fetchMore']
>(
  data: T,
  {
    loading,
    fetchMore,
    cursor = 'cursor',
  }: {
    loading: boolean;
    fetchMore: F;
    cursor?: string;
  }
): CommonPaginationProps => ({
  hasMore: data?.pageInfo?.hasNextPage,
  fetchMore: () =>
    fetchMore({
      variables: {
        [cursor]: data?.pageInfo?.endCursor,
      },
    }),
  loading,
});

/** Converts feed filters to variables ready to use within a feed query. */
export const buildFeedQueryVariables = (
  activeFilters: Partial<FeedFilters>
): FeedQueryVariables => {
  const activeTypes = activeFilters.type
    ? activeFilters['type']
        .map((item) => upperFirst(item))
        .filter((item) => item in FeedType)
        .map((item) => FeedType[item as keyof typeof FeedType])
    : [];

  const activeCategories = activeFilters.category
    ? activeFilters['category']
    : [];

  const activeLocations = activeFilters.location
    ? activeFilters['location']
    : [];

  return {
    types: activeTypes.length ? activeTypes : undefined,
    categories: activeCategories.length ? activeCategories : undefined,
    locations: activeLocations.length ? activeLocations : undefined,
  };
};

/** Retries a specific mutation as long as the server returns an error. */
export const retryOnError = <T>(
  mutate: () => Promise<T>,
  numberOfRetries = 10
) =>
  mutate().catch((error) => {
    // Only handle remote GraphQL errors here.
    if (!(error instanceof ApolloError && error.graphQLErrors.length))
      throw error;

    return new Promise<T>((resolve, reject) => {
      if (numberOfRetries > 0) {
        setTimeout(() => {
          resolve(retryOnError(mutate, numberOfRetries - 1));
        }, 500);
      } else {
        reject(error);
      }
    });
  });
