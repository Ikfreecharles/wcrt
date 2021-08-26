import { InMemoryCache } from '@apollo/client/core';

import { renderHook, TestingContext, apollo } from 'testing/util';
import { ContentStateFragmentDoc } from 'lib/graphql';
import { useContentState } from 'hooks/content';

jest.mock('hooks/profile');

describe('useContentState', () => {
  const mockedCache = new InMemoryCache();
  mockedCache.writeFragment({
    fragment: ContentStateFragmentDoc,
    id: 'T:123:Article',
    data: {
      __typename: 'Content',
      _viewer: {
        ratedBy: {
          count: 1,
        },
        commentedBy: {
          count: 1,
        },
      },
    },
  });

  test('initial state', () => {
    const { result } = renderHook(() => useContentState('T:123:Article'), {
      wrapper: TestingContext,
    });
    expect(result.current).toEqual({
      subscribed: false,
      supported: false,
      commented: false,
    });
  });

  test('supported state', () => {
    apollo.cache = mockedCache;
    const { result } = renderHook(() => useContentState('T:123:Article'), {
      wrapper: TestingContext,
    });
    expect(result.current.supported).toBe(true);
  });

  test('commented state', () => {
    apollo.cache = mockedCache;
    const { result } = renderHook(() => useContentState('T:123:Article'), {
      wrapper: TestingContext,
    });
    expect(result.current.commented).toBe(true);
  });
});
