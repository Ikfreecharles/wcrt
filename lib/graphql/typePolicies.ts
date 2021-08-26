import { TypePolicy, TypePolicies, FieldPolicy } from '@apollo/client';
import dayjs from 'dayjs';

import { mergeUniqueEdges } from 'util/cache';

/** Add those field policies to all entities. */
const sharedFieldPolicies: TypePolicy['fields'] = {
  createdAt: (value) => dayjs(value).toDate(),
  updatedAt: (value) => dayjs(value).toDate(),
};

/**
 * Create a field policy to handle pagination so that the contents from a new
 * page are concatenated to the current contents.
 */
const getConcatPaginationPolicy = (
  specialKeyArgs: string[] = []
): FieldPolicy => ({
  keyArgs: ['orderBy', 'filter', 'relationsFilter', 'type', ...specialKeyArgs],
  merge: (existing, incoming, { mergeObjects, args }) => {
    // Skip merging if the cache is empty yet.
    if (!existing) return incoming;

    // Perform a simple merge for non-paginated queries.
    if (!existing || !existing.pageInfo || !incoming.pageInfo)
      return mergeObjects(existing, incoming);

    // If no cursor was given, we probably want to fetch the first page only.
    if (!args?.pagination?.afterCursor) return incoming;

    return {
      ...existing,
      edges: mergeUniqueEdges([...existing.edges, ...incoming.edges]),
      pageInfo: incoming.pageInfo,
    };
  },
});

/** Our custom type policies to handle pagination and client-only fields. */
export default {
  Query: {
    fields: {
      feeds: getConcatPaginationPolicy(),
      groups: getConcatPaginationPolicy(),
      messagingStats: (existing) => existing || { unreadCount: 0 },
    },
  },
  Thing: {
    fields: {
      ...sharedFieldPolicies,
    },
  },
  Agent: {
    fields: {
      ...sharedFieldPolicies,
      createsContent: getConcatPaginationPolicy(),
      createsComment: getConcatPaginationPolicy(),
      createsRating: getConcatPaginationPolicy(),
    },
  },
  Group: {
    fields: {
      administeredBy: getConcatPaginationPolicy(),
      managesContent: getConcatPaginationPolicy(),
      managesTask: getConcatPaginationPolicy(),
    },
  },
  Content: {
    fields: {
      ...sharedFieldPolicies,
      commentedBy: getConcatPaginationPolicy(),
    },
  },
  Impulse: {
    fields: {
      ...sharedFieldPolicies,
      relevance: () => 50, // @todo
    },
  },
} as TypePolicies;
