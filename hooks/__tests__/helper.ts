import { renderHook, TestingContext } from 'testing/util';
import { useElementId } from 'hooks/helper';

describe('useElementId', () => {
  test('string with prefix', async () => {
    const { result } = renderHook(() => useElementId('sample'), {
      wrapper: TestingContext,
    });
    expect(result.current).toBe('sample-1');
  });
});
