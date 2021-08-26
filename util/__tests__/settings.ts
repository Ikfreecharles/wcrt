import { setCookie, destroyCookie } from 'nookies';

import { readSettingsFromCookies, writeSettingsToCookies } from 'util/settings';

describe('readSettingsFromCookies', () => {
  test('mocked cookie data', () => {
    expect(readSettingsFromCookies()).toEqual({
      paletteType: 'dark',
    });
  });
});

describe('writeSettingsToCookies', () => {
  test('cookie creation', () => {
    writeSettingsToCookies({
      paletteType: 'dark',
    });
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith(
      null,
      'settings.paletteType',
      'dark',
      expect.anything()
    );
  });

  test('cookie deletion', () => {
    writeSettingsToCookies({
      paletteType: undefined,
    });
    expect(destroyCookie).toHaveBeenCalledTimes(1);
    expect(destroyCookie).toHaveBeenCalledWith(null, 'settings.paletteType');
  });
});
