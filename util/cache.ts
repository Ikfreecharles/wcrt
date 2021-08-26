import { ApolloCache, Cache, Reference } from '@apollo/client';
import { Modifier } from '@apollo/client/cache/core/types/common';
import { FeedType } from 'lib/graphql';
import uniqBy from 'lodash/uniqBy';

import { hasProperty } from 'util/type';

/** We better assume that we do not know much about the cache data of the Apollo Client. */
type UnknownCacheData = Record<string, unknown>;

/**
 * The Apollo Client serializes query parameters and add them to its cache keys.
 * This function helps us, to unserialize the arguments again.
 */
const getModifierFieldArgs = (
  modifierOptions: Parameters<Modifier<UnknownCacheData>>[1]
) =>
  JSON.parse(
    modifierOptions.storeFieldName.replace(`${modifierOptions.fieldName}:`, '')
  );

/** Filters duplicate items by looking at their IDs (or refs). */
export const mergeUniqueItems = <T>(items: T[]) => {
  let itemsAreComparable = true;

  const comparedItems = uniqBy(items, (item) => {
    // With cache normalization.
    if (hasProperty(item, '__ref')) return item.__ref;

    // Without cache normalization.
    if (hasProperty(item, 'id')) return item.id;

    itemsAreComparable = false;
  });

  return itemsAreComparable ? comparedItems : items;
};

/** Filters duplicate edges by looking at their node IDs (or refs). */
export const mergeUniqueEdges = (edges: unknown[]) => {
  let edgesAreComparable = true;

  const comparedEdges = uniqBy(edges, (item) => {
    if (hasProperty(item, 'node')) {
      // With cache normalization.
      if (hasProperty(item.node, '__ref')) return item.node.__ref;

      // Without cache normalization.
      if (hasProperty(item.node, 'id')) return item.node.id;
    }

    edgesAreComparable = false;
  });

  return edgesAreComparable ? comparedEdges : edges;
};

/** Retrieves a cache key (with serialized query parameters) by its actual name. */
export const getStoreFieldName = <T extends UnknownCacheData, K extends string>(
  store: T,
  fieldName: K
) => {
  const possibleFieldNames = Object.keys(store).filter((item) => {
    const exactMatch = item === fieldName;
    const matchWithArguments =
      item.startsWith(fieldName) &&
      item.charAt(fieldName.length) === '(' &&
      item.charAt(item.length - 1) === ')';

    return exactMatch || matchWithArguments;
  });

  return possibleFieldNames.length === 1
    ? (possibleFieldNames[0] as keyof T)
    : null;
};

/**
 * Creates a cache modifier which adds a referenced entity as a new edge to a
 * connection field.
 */
export const addToConnectionStore =
  (
    ref: Reference | undefined,
    edgeType: string,
    addToTop = false
  ): Modifier<UnknownCacheData> =>
  (prevData, { canRead }) => {
    let newCount: number | null = null;
    let newEdges: unknown[] | null = null;

    if (hasProperty(prevData, 'count') && typeof prevData.count === 'number') {
      newCount = prevData.count + 1;
    }

    if (
      hasProperty(prevData, 'edges') &&
      Array.isArray(prevData.edges) &&
      canRead(ref)
    ) {
      const newEdge = { __typename: edgeType, node: ref };
      newEdges = mergeUniqueEdges(
        addToTop ? [newEdge, ...prevData.edges] : [...prevData.edges, newEdge]
      );
    }

    return {
      ...prevData,
      ...(newCount !== null && {
        count: newCount,
      }),
      ...(newEdges !== null && {
        edges: newEdges,
      }),
    };
  };

/**
 * Creates a cache modifier which removes the edge of a referenced entity from a
 * connection field.
 */
export const removeFromConnectionStore =
  (id: string): Modifier<UnknownCacheData> =>
  (prevData) => {
    let newCount: number | null = null;
    let newEdges: unknown[] | null = null;

    if (hasProperty(prevData, 'count') && typeof prevData.count === 'number') {
      newCount = prevData.count - 1;
    }

    if (hasProperty(prevData, 'edges') && Array.isArray(prevData.edges)) {
      newEdges = prevData.edges.filter(
        (item) => item.node.__ref !== id && item.node.id !== id
      );
    }

    return {
      ...prevData,
      ...(newCount !== null && {
        count: newCount,
      }),
      ...(newEdges !== null && {
        edges: newEdges,
      }),
    };
  };

/** Creates a cache modifier which increments or decrements a count of a connection field. */
export const modifyStoreFieldCount =
  (fieldName: string, modification: number): Modifier<UnknownCacheData> =>
  (prevData) => {
    const storeFieldName = getStoreFieldName(prevData, fieldName);
    const storeFieldData = storeFieldName ? prevData[storeFieldName] : null;

    return storeFieldName &&
      hasProperty(storeFieldData, 'count') &&
      typeof storeFieldData.count === 'number'
      ? {
          ...prevData,
          [storeFieldName]: {
            ...storeFieldData,
            count: storeFieldData.count + modification,
          },
        }
      : prevData;
  };

/**
 * Creates a teaser fragment and adds it to the appropriate cache entries of the
 * feed queries.
 */
export const addGlobalTeaserFragment = (
  cache: ApolloCache<unknown>,
  details: {
    type: keyof typeof FeedType | 'Group';
    categories: string[];
    locations: string[];
  },
  options: Cache.WriteFragmentOptions<unknown, unknown>
) => {
  const ref = cache.writeFragment(options);
  const queryName = details.type === 'Group' ? 'groups' : 'feeds';

  cache.modify({
    fields: {
      [queryName]: (prevData, modifierOptions) => {
        const args = getModifierFieldArgs(modifierOptions);

        // Do not add the fragment if the type filter does not match.
        if (
          details.type !== 'Group' &&
          Array.isArray(args.type) &&
          !args.type.includes(FeedType[details.type])
        )
          return prevData;

        // Do not add the fragment if the category filter does not match.
        if (
          Array.isArray(args.relationsFilter.categorizedBy.id_in) &&
          !args.relationsFilter.categorizedBy.id_in.some((item: string) =>
            details.categories.includes(item)
          )
        )
          return prevData;

        // Do not add the fragment if the location filter does not match.
        if (
          Array.isArray(args.relationsFilter.locatedByAddress.id_in) &&
          !args.relationsFilter.locatedByAddress.id_in.some((item: string) =>
            details.locations.includes(item)
          )
        )
          return prevData;

        return addToConnectionStore(
          ref,
          'FeedEdge',
          true
        )(prevData, modifierOptions);
      },
    },
  });
};
