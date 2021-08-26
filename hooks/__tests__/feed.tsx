import { renderHook, TestingContext, act, routerReplace } from 'testing/util';
import { useFeedFilters } from 'hooks/feed';

describe('useFeedFilters', () => {
  describe('initialization', () => {
    test('initial filters', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: TestingContext,
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: [],
        location: [],
      });
    });

    test('URL preset (string)', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: function QueryTestingContext({ children }) {
          return (
            <TestingContext query={{ category: 'category-123' }}>
              {children}
            </TestingContext>
          );
        },
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: ['category-123'],
        location: [],
      });
    });

    test('URL preset (array)', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: function QueryTestingContext({ children }) {
          return (
            <TestingContext
              query={{ category: ['category-123', 'category-456'] }}
            >
              {children}
            </TestingContext>
          );
        },
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: ['category-123', 'category-456'],
        location: [],
      });
    });
  });

  describe('update', () => {
    test('filter update', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: TestingContext,
      });
      act(() => {
        result.current.setNewFilters((prevState) => ({
          ...prevState,
          category: ['category-123'],
        }));
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: [],
        location: [],
      });
      act(() => {
        result.current.applyNewFilters();
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: ['category-123'],
        location: [],
      });
    });

    test('URL update', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: TestingContext,
      });
      act(() => {
        result.current.setNewFilters((prevState) => ({
          ...prevState,
          category: ['category-123'],
        }));
      });
      act(() => {
        result.current.applyNewFilters();
      });
      expect(routerReplace).toHaveBeenCalledTimes(1);
      expect(routerReplace).toHaveBeenCalledWith(
        {
          pathname: '/',
          query: { type: [], category: ['category-123'], location: [] },
        },
        undefined,
        { shallow: true }
      );
    });

    test('pending state', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: TestingContext,
      });
      expect(result.current.filtersPending).toBe(false);
      act(() => {
        result.current.setNewFilters((prevState) => ({
          ...prevState,
          category: ['category-123'],
        }));
      });
      expect(result.current.filtersPending).toBe(true);
      act(() => {
        result.current.applyNewFilters();
      });
      expect(result.current.filtersPending).toBe(false);
    });

    test('filter reset', () => {
      const { result } = renderHook(() => useFeedFilters(), {
        wrapper: function QueryTestingContext({ children }) {
          return (
            <TestingContext query={{ category: 'category-123' }}>
              {children}
            </TestingContext>
          );
        },
      });
      act(() => {
        result.current.resetFilters();
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: ['category-123'],
        location: [],
      });
      act(() => {
        result.current.applyNewFilters();
      });
      expect(result.current.filters).toEqual({
        type: [],
        category: [],
        location: [],
      });
    });
  });
});
