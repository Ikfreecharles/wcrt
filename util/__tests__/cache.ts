import { InMemoryCache } from '@apollo/client';
import { Modifier } from '@apollo/client/cache/core/types/common';

import { getEntityConnection } from 'testing/util';
import {
  category,
  address,
  newGroup,
  newImpulse,
  newArticle,
} from 'testing/data';
import { createCache } from 'lib/apollo';
import {
  mergeUniqueItems,
  mergeUniqueEdges,
  addToConnectionStore,
  removeFromConnectionStore,
  getStoreFieldName,
  modifyStoreFieldCount,
  addGlobalTeaserFragment,
} from 'util/cache';
import {
  FeedDocument,
  FeedQuery,
  FeedType,
  ImpulseTeaserFragment,
  ImpulseTeaserFragmentDoc,
  GroupTeaserFragment,
  GroupTeaserFragmentDoc,
  GroupsDocument,
  GroupsQuery,
} from 'lib/graphql';

jest.unmock('@apollo/client');

const mockedDetails = {
  canRead: () => true,
} as Parameters<Modifier<any>>[1];

describe('mergeUniqueItems', () => {
  test('with cache normalization', () => {
    expect(
      mergeUniqueItems([
        { __ref: 'T:123:Article' },
        { __ref: 'T:123:Article' },
        { __ref: 'T:456:Article' },
      ])
    ).toEqual([{ __ref: 'T:123:Article' }, { __ref: 'T:456:Article' }]);
  });

  test('without cache normalization', () => {
    expect(
      mergeUniqueItems([
        { id: 'T:123:Article' },
        { id: 'T:123:Article' },
        { id: 'T:456:Article' },
      ])
    ).toEqual([{ id: 'T:123:Article' }, { id: 'T:456:Article' }]);
  });

  test('mixed cache normalization (normalized first)', () => {
    expect(
      mergeUniqueItems([
        { __ref: 'T:123:Article' },
        { id: 'T:123:Article' },
        { id: 'T:456:Article' },
      ])
    ).toEqual([{ __ref: 'T:123:Article' }, { id: 'T:456:Article' }]);
  });

  test('mixed cache normalization (normalized last)', () => {
    expect(
      mergeUniqueItems([
        { id: 'T:123:Article' },
        { __ref: 'T:123:Article' },
        { id: 'T:456:Article' },
      ])
    ).toEqual([{ id: 'T:123:Article' }, { id: 'T:456:Article' }]);
  });

  test('missing identification', () => {
    expect(
      mergeUniqueItems([
        { something: 'T:123:Article' },
        { something: 'T:123:Article' },
        { something: 'T:456:Article' },
      ])
    ).toEqual([
      { something: 'T:123:Article' },
      { something: 'T:123:Article' },
      { something: 'T:456:Article' },
    ]);
  });
});

describe('mergeUniqueEdges', () => {
  test('with cache normalization', () => {
    expect(
      mergeUniqueEdges([
        { node: { __ref: 'T:123:Article' } },
        { node: { __ref: 'T:123:Article' } },
        { node: { __ref: 'T:456:Article' } },
      ])
    ).toEqual([
      { node: { __ref: 'T:123:Article' } },
      { node: { __ref: 'T:456:Article' } },
    ]);
  });

  test('without cache normalization', () => {
    expect(
      mergeUniqueEdges([
        { node: { id: 'T:123:Article' } },
        { node: { id: 'T:123:Article' } },
        { node: { id: 'T:456:Article' } },
      ])
    ).toEqual([
      { node: { id: 'T:123:Article' } },
      { node: { id: 'T:456:Article' } },
    ]);
  });

  test('mixed cache normalization (normalized first)', () => {
    expect(
      mergeUniqueEdges([
        { node: { __ref: 'T:123:Article' } },
        { node: { id: 'T:123:Article' } },
        { node: { id: 'T:456:Article' } },
      ])
    ).toEqual([
      { node: { __ref: 'T:123:Article' } },
      { node: { id: 'T:456:Article' } },
    ]);
  });

  test('mixed cache normalization (normalized last)', () => {
    expect(
      mergeUniqueEdges([
        { node: { id: 'T:123:Article' } },
        { node: { __ref: 'T:123:Article' } },
        { node: { id: 'T:456:Article' } },
      ])
    ).toEqual([
      { node: { id: 'T:123:Article' } },
      { node: { id: 'T:456:Article' } },
    ]);
  });

  test('missing identification', () => {
    expect(
      mergeUniqueEdges([
        { node: { something: 'T:123:Article' } },
        { node: { something: 'T:123:Article' } },
        { node: { something: 'T:456:Article' } },
      ])
    ).toEqual([
      { node: { something: 'T:123:Article' } },
      { node: { something: 'T:123:Article' } },
      { node: { something: 'T:456:Article' } },
    ]);
  });

  test('malformed', () => {
    expect(
      mergeUniqueEdges([
        { something: 'T:123:Article' },
        { something: 'T:123:Article' },
        { something: 'T:456:Article' },
      ])
    ).toEqual([
      { something: 'T:123:Article' },
      { something: 'T:123:Article' },
      { something: 'T:456:Article' },
    ]);
  });
});

describe('getStoreFieldName', () => {
  test('exactly matching', () => {
    expect(
      getStoreFieldName(
        {
          someField: 'someValue',
          someOtherField: 'someValue',
        },
        'someField'
      )
    ).toBe('someField');
  });

  test('matching with arguments', () => {
    expect(
      getStoreFieldName(
        {
          'someField({"orderBy":{"createdAt":{"ascending":false,"priority":1}}})':
            'someValue',
          someOtherField: 'someValue',
        },
        'someField'
      )
    ).toBe(
      'someField({"orderBy":{"createdAt":{"ascending":false,"priority":1}}})'
    );
  });

  test('not matching', () => {
    expect(
      getStoreFieldName({ someOtherField: 'someValue' }, 'someField')
    ).toBe(null);
  });

  test('accidentally matching', () => {
    expect(getStoreFieldName({ someOtherField: 'someValue' }, 'some')).toBe(
      null
    );
  });
});

describe('addToConnectionStore', () => {
  test('append', () => {
    const modify = addToConnectionStore({ __ref: 'newNode' }, 'TestEdge');
    expect(
      modify(
        {
          count: 1,
          edges: [{ __typename: 'TestEdge', node: { __ref: 'existingNode' } }],
        },
        mockedDetails
      )
    ).toEqual({
      count: 2,
      edges: [
        { __typename: 'TestEdge', node: { __ref: 'existingNode' } },
        { __typename: 'TestEdge', node: { __ref: 'newNode' } },
      ],
    });
  });

  test('prepend', () => {
    const modify = addToConnectionStore({ __ref: 'newNode' }, 'TestEdge', true);
    expect(
      modify(
        {
          count: 1,
          edges: [{ __typename: 'TestEdge', node: { __ref: 'existingNode' } }],
        },
        mockedDetails
      )
    ).toEqual({
      count: 2,
      edges: [
        { __typename: 'TestEdge', node: { __ref: 'newNode' } },
        { __typename: 'TestEdge', node: { __ref: 'existingNode' } },
      ],
    });
  });

  test('increment only', () => {
    const modify = addToConnectionStore({ __ref: 'newNode' }, 'TestEdge');
    expect(modify({ count: 1 }, mockedDetails)).toEqual({
      count: 2,
    });
  });
});

describe('removeFromConnectionStore', () => {
  test('found', () => {
    const modify = removeFromConnectionStore('someNode');
    expect(
      modify(
        {
          count: 2,
          edges: [
            { __typename: 'TestEdge', node: { __ref: 'someNode' } },
            { __typename: 'TestEdge', node: { __ref: 'someOtherNode' } },
          ],
        },
        mockedDetails
      )
    ).toEqual({
      count: 1,
      edges: [{ __typename: 'TestEdge', node: { __ref: 'someOtherNode' } }],
    });
  });

  test('not found', () => {
    const modify = removeFromConnectionStore('unknownNode');
    expect(
      modify(
        {
          count: 2,
          edges: [
            { __typename: 'TestEdge', node: { __ref: 'someNode' } },
            { __typename: 'TestEdge', node: { __ref: 'someOtherNode' } },
          ],
        },
        mockedDetails
      )
    ).toEqual({
      count: 1,
      edges: [
        { __typename: 'TestEdge', node: { __ref: 'someNode' } },
        { __typename: 'TestEdge', node: { __ref: 'someOtherNode' } },
      ],
    });
  });

  test('decrement only', () => {
    const modify = removeFromConnectionStore('someNode');
    expect(modify({ count: 2 }, mockedDetails)).toEqual({
      count: 1,
    });
  });
});

describe('modifyStoreFieldCount', () => {
  test('increment', () => {
    const modify = modifyStoreFieldCount('someField', +1);
    expect(modify({ someField: { count: 0 } }, mockedDetails)).toEqual({
      someField: { count: 1 },
    });
  });

  test('decrement', () => {
    const modify = modifyStoreFieldCount('someField', -1);
    expect(modify({ someField: { count: 1 } }, mockedDetails)).toEqual({
      someField: { count: 0 },
    });
  });

  test('undefined field', () => {
    const modify = modifyStoreFieldCount('someField', +1);
    expect(modify({ someOtherField: { count: 0 } }, mockedDetails)).toEqual({
      someOtherField: { count: 0 },
    });
  });

  test('undefined count', () => {
    const modify = modifyStoreFieldCount('someField', +1);
    expect(modify({ someField: { someOtherField: 0 } }, mockedDetails)).toEqual(
      {
        someField: { someOtherField: 0 },
      }
    );
  });
});

describe('addGlobalTeaserFragment', () => {
  let cache: InMemoryCache;
  beforeEach(() => {
    cache = createCache();
  });

  describe('impulse', () => {
    const impulse = newImpulse();
    const articleConnection = getEntityConnection(newArticle, 3);
    const mockedQuery = {
      query: FeedDocument,
      data: {
        feeds: { ...articleConnection },
      },
    };
    const fragmentDetails = {
      type: 'Impulse' as keyof typeof FeedType,
      categories: impulse.categorizedBy.edges.map((item) => item.node.id),
      locations: impulse.locatedByAddress ? [impulse.locatedByAddress.id] : [],
    };
    const fragmentOptions = {
      fragment: ImpulseTeaserFragmentDoc,
      fragmentName: 'ImpulseTeaser',
      id: impulse.id,
      data: impulse,
    };

    test('fragment', () => {
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const fragment = cache.readFragment<ImpulseTeaserFragment>({
        id: impulse.id,
        fragment: ImpulseTeaserFragmentDoc,
        fragmentName: 'ImpulseTeaser',
      });
      expect(fragment?.id).toBe(impulse.id);
    });

    test('feed', () => {
      cache.writeQuery(mockedQuery);
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(impulse.id);
    });

    test('feed with matching type filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: { types: ['ARTICLE', 'IMPULSE'] },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: { types: ['ARTICLE', 'IMPULSE'] },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(impulse.id);
    });

    test('feed with foreign type filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: { types: ['ARTICLE'] },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: { types: ['ARTICLE'] },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(
        articleConnection.edges[0].node.id
      );
    });

    test('feed with matching category filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          categories: [impulse.categorizedBy.edges[0].node.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: {
          categories: [impulse.categorizedBy.edges[0].node.id],
        },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(impulse.id);
    });

    test('feed with foreign category filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          categories: [category.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: {
          categories: [category.id],
        },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(
        articleConnection.edges[0].node.id
      );
    });

    test('feed with matching location filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          locations: [impulse.locatedByAddress?.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: {
          locations: [impulse.locatedByAddress?.id],
        },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(impulse.id);
    });

    test('feed with foreign location filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          locations: [address.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<FeedQuery>({
        query: FeedDocument,
        variables: {
          locations: [address.id],
        },
      });
      expect(feedData?.feeds.edges[0].node.id).toBe(
        articleConnection.edges[0].node.id
      );
    });
  });

  describe('group', () => {
    const group = newGroup(4);
    const groupConnection = getEntityConnection(newGroup, 5);
    const mockedQuery = {
      query: GroupsDocument,
      data: {
        groups: { ...groupConnection },
      },
    };
    const fragmentDetails = {
      type: 'Group' as keyof typeof FeedType,
      categories: group.categorizedBy ? [group.categorizedBy.id] : [],
      locations: group.locatedByAddress ? [group.locatedByAddress.id] : [],
    };
    const fragmentOptions = {
      fragment: GroupTeaserFragmentDoc,
      fragmentName: 'GroupTeaser',
      id: group.id,
      data: group,
    };

    test('fragment', () => {
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const fragment = cache.readFragment<GroupTeaserFragment>({
        id: group.id,
        fragment: GroupTeaserFragmentDoc,
        fragmentName: 'GroupTeaser',
      });
      expect(fragment?.id).toBe(group.id);
    });

    test('feed', () => {
      cache.writeQuery(mockedQuery);
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<GroupsQuery>({
        query: GroupsDocument,
      });
      expect(feedData?.groups.edges[0].node.id).toBe(group.id);
    });

    test('feed with matching category filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          categories: [group.categorizedBy!.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<GroupsQuery>({
        query: GroupsDocument,
        variables: {
          categories: [group.categorizedBy!.id],
        },
      });
      expect(feedData?.groups.edges[0].node.id).toBe(group.id);
    });

    test('feed with foreign category filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          categories: ['T:123:Category'],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<GroupsQuery>({
        query: GroupsDocument,
        variables: {
          categories: ['T:123:Category'],
        },
      });
      expect(feedData?.groups.edges[0].node.id).toBe(
        groupConnection.edges[0].node.id
      );
    });

    test('feed with matching location filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          locations: [group.locatedByAddress!.id],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<GroupsQuery>({
        query: GroupsDocument,
        variables: {
          locations: [group.locatedByAddress!.id],
        },
      });
      expect(feedData?.groups.edges[0].node.id).toBe(group.id);
    });

    test('feed with foreign location filter', () => {
      cache.writeQuery({
        ...mockedQuery,
        variables: {
          locations: ['T:123:Address'],
        },
      });
      addGlobalTeaserFragment(cache, fragmentDetails, fragmentOptions);
      const feedData = cache.readQuery<GroupsQuery>({
        query: GroupsDocument,
        variables: {
          locations: ['T:123:Address'],
        },
      });
      expect(feedData?.groups.edges[0].node.id).toBe(
        groupConnection.edges[0].node.id
      );
    });
  });
});
