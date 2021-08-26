import {
  renderHook,
  TestingContext,
  auth,
  routerPush,
  routerBack,
  apollo,
} from 'testing/util';
import {
  useMainNavigation,
  useGroupNavigation,
  useRelativeNavigation,
  useCanonicalUrl,
  useSharingUrl,
} from 'hooks/navigation';

const SomePageContext: React.FC = ({ children }) => (
  <TestingContext path="/something">{children}</TestingContext>
);

const SomeNestedPageContext: React.FC = ({ children }) => (
  <TestingContext path="/something/nested">{children}</TestingContext>
);

const HomePageContext: React.FC = ({ children }) => (
  <TestingContext path="/">{children}</TestingContext>
);

const GroupInternalContext: React.FC = ({ children }) => (
  <TestingContext path="/groups/123">{children}</TestingContext>
);

describe('useMainNavigation', () => {
  test('navigation items', () => {
    const { result } = renderHook(() => useMainNavigation(), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual([
      expect.objectContaining({ label: 'Network', path: '/' }),
      expect.objectContaining({ label: 'Groups', path: '/groups' }),
      expect.objectContaining({ label: 'Personal', path: '/personal' }),
    ]);
  });

  test('active page', () => {
    const { result } = renderHook(() => useMainNavigation(), {
      wrapper: HomePageContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Network',
          isActive: true,
        }),
      ])
    );
  });

  test('with search', () => {
    process.env.NEXT_PUBLIC_FEATURE_SEARCH = 'true';
    const { result } = renderHook(() => useMainNavigation(true), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Search',
          path: '/search',
        }),
      ])
    );
  });

  test('authenticated', () => {
    auth.session = auth.getActiveSession();
    const { result } = renderHook(() => useMainNavigation(true), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Personal',
          path: '/personal/data',
        }),
      ])
    );
  });

  test('inactive messaging', () => {
    const { result } = renderHook(() => useMainNavigation(true), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Groups',
          hasMessages: false,
        }),
      ])
    );
  });

  test('active messaging', () => {
    apollo.response = {
      messagingStats: {
        unreadCount: 1,
      },
    };
    const { result } = renderHook(() => useMainNavigation(true), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Groups',
          hasMessages: true,
        }),
      ])
    );
  });
});

describe('useGroupNavigation', () => {
  test('navigation items', () => {
    const { result } = renderHook(() => useGroupNavigation('T:123:Group'), {
      wrapper: SomePageContext,
    });
    expect(result.current).toEqual([
      expect.objectContaining({
        label: 'Chat',
        path: '/groups/123',
      }),
      expect.objectContaining({
        label: 'Video meetings',
        path: '/groups/123/meetings',
      }),
      expect.objectContaining({
        label: 'Members',
        path: '/groups/123/members',
      }),
      expect.objectContaining({
        label: 'Network contents',
        path: '/groups/123/contents',
      }),
      expect.objectContaining({
        label: 'Tasks',
        path: '/groups/123/tasks',
      }),
      expect.objectContaining({
        label: 'Calendar',
        path: '/groups/123/calendar',
      }),
      expect.objectContaining({
        label: 'Shared documents',
        path: '/groups/123/documents',
      }),
      expect.objectContaining({
        label: 'File storage',
        path: '/groups/123/files',
      }),
      expect.objectContaining({
        label: 'Polls',
        path: '/groups/123/polls',
      }),
      expect.objectContaining({
        label: 'Applications',
        path: '/groups/123/applications',
      }),
    ]);
  });

  test('active page', () => {
    const { result } = renderHook(() => useGroupNavigation('T:123:Group'), {
      wrapper: GroupInternalContext,
    });
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: 'Chat',
          path: '/groups/123',
          isActive: true,
        }),
      ])
    );
  });
});

describe('useRelativeNavigation', () => {
  test('navigate to previous page', () => {
    const { result } = renderHook(() => useRelativeNavigation(), {
      wrapper: SomeNestedPageContext,
    });
    result.current.navigateBack();
    expect(routerBack).toHaveBeenCalledTimes(1);
  });

  test('navigate from nested path to base path', () => {
    const { result } = renderHook(() => useRelativeNavigation('/something'), {
      wrapper: SomeNestedPageContext,
    });
    result.current.navigateBack();
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith('/something');
  });

  test('navigate from base path to parent path', () => {
    const { result } = renderHook(
      () => useRelativeNavigation('/something/nested'),
      {
        wrapper: SomeNestedPageContext,
      }
    );
    result.current.navigateBack();
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith('/something');
  });
});

describe('useCanonicalUrl', () => {
  test('home page', () => {
    const { result } = renderHook(() => useCanonicalUrl(), {
      wrapper: HomePageContext,
    });
    expect(result.current()).toBe('https://dev.we-create.io/');
    expect(result.current('en')).toBe('https://dev.we-create.io/en');
  });

  test('some page', () => {
    const { result } = renderHook(() => useCanonicalUrl(), {
      wrapper: SomePageContext,
    });
    expect(result.current()).toBe('https://dev.we-create.io/something');
    expect(result.current('en')).toBe('https://dev.we-create.io/en/something');
  });
});

describe('useSharingUrl', () => {
  test('home page', () => {
    const { result } = renderHook(() => useSharingUrl(), {
      wrapper: HomePageContext,
    });
    expect(result.current()).toBe('https://dev.we-create.io/');
    expect(result.current('Facebook')).toBe(
      'https://www.facebook.com/sharer.php?display=page&u=https%3A%2F%2Fdev.we-create.io%2F'
    );
    expect(result.current('Twitter')).toBe(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fdev.we-create.io%2F'
    );
    expect(result.current('LinkedIn')).toBe(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdev.we-create.io%2F'
    );
  });

  test('some page', () => {
    const { result } = renderHook(() => useSharingUrl(), {
      wrapper: SomePageContext,
    });
    expect(result.current()).toBe('https://dev.we-create.io/something');
    expect(result.current('Facebook')).toBe(
      'https://www.facebook.com/sharer.php?display=page&u=https%3A%2F%2Fdev.we-create.io%2Fsomething'
    );
    expect(result.current('Twitter')).toBe(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fdev.we-create.io%2Fsomething'
    );
    expect(result.current('LinkedIn')).toBe(
      'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdev.we-create.io%2Fsomething'
    );
  });
});
