import {
  renderHook,
  TestingContext,
  act,
  readSettingsFromCookies,
  writeSettingsToCookies,
} from 'testing/util';
import { useSettings } from 'hooks/settings';

jest.mock('util/settings');

describe('useSettings', () => {
  test('inital state', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestingContext,
    });
    expect(result.current[0]).toEqual({
      language: 'en',
      paletteType: 'light',
      headerState: 'expanded',
    });
    expect(readSettingsFromCookies).toHaveBeenCalledTimes(1);
  });

  test('simple update', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestingContext,
    });
    act(() => result.current[1]({ paletteType: 'dark' }));
    expect(writeSettingsToCookies).toHaveBeenCalledTimes(1);
    expect(writeSettingsToCookies).toHaveBeenCalledWith({
      paletteType: 'dark',
    });
  });

  test('language update', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestingContext,
    });
    act(() => result.current[1]({ language: 'de' }));
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://dev.we-create.io/de'
    );
  });
});
