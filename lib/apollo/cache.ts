import { InMemoryCache, QueryOptions } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';

import { initializeApollo } from 'lib/apollo/client';
import typePolicies from 'lib/graphql/typePolicies';
import possibleTypes from 'lib/graphql/generated/possibleTypes.json';

/** Create an configured cache for the Apollo Client. */
export const createCache = () =>
  new InMemoryCache({
    ...possibleTypes,
    typePolicies,
    /**
     * The id already includes the type name, so we can use it as primary key
     * for cache normalization.
     *
     * @todo Migrate to type policy when API supports fallback functionality.
     *   https://github.com/apollographql/apollo-client/issues/6808#issuecomment-671388857
     */
    dataIdFromObject: ({ id }) => (id ? String(id) : undefined),
  });

/** Run a GraphQL and return the intitialized cache content. */
export const initializeCache = async (
  ctx: GetServerSidePropsContext,
  options: QueryOptions
) => {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query(options);
    const dataKeys = Object.keys(data);

    // If a single entity was prefetched and it returned `null`, we have a 404.
    if (dataKeys.length === 1 && data[dataKeys[0]] === null)
      ctx.res.statusCode = 404;

    return apolloClient.cache.extract();
  } catch {
    return null;
  }
};
