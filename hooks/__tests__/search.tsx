import { ChangeEvent } from 'react';

import { renderHook, TestingContext, act, apollo } from 'testing/util';
import { person } from 'testing/data';
import { useAccountSearch } from 'hooks/search';

describe('useAccountSearch', () => {
  beforeAll(() => {
    apollo.response = {
      persons: {
        edges: [
          {
            node: {
              ...person,
              representedBy: {
                id: 'T:123:OnlineAccount',
              },
            },
          },
        ],
      },
    };
  });

  test('initial state', () => {
    const { result } = renderHook(() => useAccountSearch(), {
      wrapper: TestingContext,
    });
    expect(result.current.searchValue).toEqual('');
    expect(result.current.results).toEqual([]);
  });

  test('search value update', () => {
    const { result } = renderHook(() => useAccountSearch(), {
      wrapper: TestingContext,
    });
    act(() =>
      result.current.handleSearch({
        target: { value: 'xyz' },
      } as ChangeEvent<HTMLInputElement>)
    );
    expect(result.current.searchValue).toEqual('xyz');
  });

  test('search value below threshold', () => {
    const { result } = renderHook(() => useAccountSearch(), {
      wrapper: TestingContext,
    });
    act(() =>
      result.current.handleSearch({
        target: { value: person.name[0] },
      } as ChangeEvent<HTMLInputElement>)
    );
    expect(result.current.results).toEqual([]);
  });

  test('search', () => {
    const { result } = renderHook(() => useAccountSearch(), {
      wrapper: TestingContext,
    });
    act(() =>
      result.current.handleSearch({
        target: { value: person.name[0] + person.name[1] },
      } as ChangeEvent<HTMLInputElement>)
    );
    expect(result.current.results).toEqual([
      { id: 'T:123:OnlineAccount', represents: { ...person } },
    ]);
  });
});
