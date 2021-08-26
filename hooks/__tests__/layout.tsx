import { useEffect, useState } from 'react';

import {
  renderHook,
  TestingContext,
  act,
  setViewportWidth,
} from 'testing/util';
import { ColumnProvider } from 'context/column';
import { TransitionProvider } from 'context/transition';
import {
  useWindowDimensions,
  usePageLayout,
  useColumnQuery,
  usePageTransitionCallback,
} from 'hooks/layout';

describe('useWindowDimensions', () => {
  test('default values', () => {
    const { result } = renderHook(() => useWindowDimensions(), {
      wrapper: TestingContext,
    });
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  test('width update', () => {
    setViewportWidth(1200);
    const { result } = renderHook(() => useWindowDimensions(), {
      wrapper: TestingContext,
    });
    expect(result.current.width).toBe(1200);
  });
});

describe('usePageLayout', () => {
  test('initial value', () => {
    const { result } = renderHook(() => usePageLayout(), {
      wrapper: TestingContext,
    });
    expect(result.current[0]).toEqual(undefined);
  });

  test('default', () => {
    const { result } = renderHook(() => usePageLayout(), {
      wrapper: TestingContext,
    });
    act(() => {
      result.current[1]({
        sidebar: {
          content: 'Sample content',
          displayOnSmallScreens: null,
        },
      });
    });
    expect(result.current[0]).toEqual({
      sidebar: {
        content: 'Sample content',
        displayOnSmallScreens: null,
      },
    });
  });

  test('reset', () => {
    const { result } = renderHook(() => usePageLayout(), {
      wrapper: TestingContext,
    });
    act(() => {
      result.current[1]({
        sidebar: {
          content: 'Sample content',
          displayOnSmallScreens: null,
        },
      });
    });
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toEqual(undefined);
  });
});

describe('useColumnQuery', () => {
  const ColumnContext: React.FC = ({ children }) => (
    <TestingContext>
      <ColumnProvider value={6}>{children}</ColumnProvider>
    </TestingContext>
  );

  describe('calculated breakpoint', () => {
    test('xs', () => {
      setViewportWidth(600);
      const { result } = renderHook(() => useColumnQuery(), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe('xs');
    });

    test('sm', () => {
      setViewportWidth(1200);
      const { result } = renderHook(() => useColumnQuery(), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe('sm');
    });

    test('md', () => {
      setViewportWidth(2000);
      const { result } = renderHook(() => useColumnQuery(), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe('md');
    });

    test('lg', () => {
      setViewportWidth(2600);
      const { result } = renderHook(() => useColumnQuery(), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe('lg');
    });

    test('xl', () => {
      setViewportWidth(4000);
      const { result } = renderHook(() => useColumnQuery(), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe('xl');
    });
  });

  describe('inactive breakpoint', () => {
    beforeAll(() => {
      setViewportWidth(600);
    });

    test('named', () => {
      const { result } = renderHook(() => useColumnQuery('sm'), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe(false);
    });

    test('custom', () => {
      const { result } = renderHook(() => useColumnQuery(600), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe(false);
    });
  });

  describe('active breakpoint', () => {
    beforeAll(() => {
      setViewportWidth(1200);
    });

    test('named', () => {
      const { result } = renderHook(() => useColumnQuery('sm'), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe(true);
    });

    test('custom', () => {
      const { result } = renderHook(() => useColumnQuery(600), {
        wrapper: ColumnContext,
      });
      expect(result.current).toBe(true);
    });
  });
});

describe('usePageTransitionCallback', () => {
  const testAction = jest.fn();
  const anotherTestAction = jest.fn();

  const TransitionContext: React.FC = ({ children }) => {
    const [transitionReady, setTransitionReady] = useState(false);
    const [transitionCallback, setTransitionCallback] = useState<() => void>();

    useEffect(() => {
      if (!transitionReady) {
        setTimeout(() => {
          setTransitionReady(true);
        }, 100);
      } else {
        transitionCallback?.();
      }
    }, [transitionReady]);

    return (
      <TestingContext>
        <TransitionProvider value={{ setTransitionCallback }}>
          {children}
        </TransitionProvider>
      </TestingContext>
    );
  };

  test('single callback', async () => {
    const { waitFor } = renderHook(
      () => usePageTransitionCallback(testAction),
      {
        wrapper: TransitionContext,
      }
    );
    await waitFor(() => expect(testAction).toHaveBeenCalledTimes(1));
  });

  test('multiple callbacks', async () => {
    renderHook(() => usePageTransitionCallback(testAction), {
      wrapper: TransitionContext,
    });
    const { waitFor } = renderHook(
      () => usePageTransitionCallback(anotherTestAction),
      {
        wrapper: TransitionContext,
      }
    );
    await waitFor(() => {
      expect(testAction).toHaveBeenCalledTimes(1);
      expect(anotherTestAction).toHaveBeenCalledTimes(1);
    });
  });
});
