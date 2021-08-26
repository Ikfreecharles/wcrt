import { MOBILE_NAV_HEIGHT } from 'lib/constants';
import { setViewportWidth } from 'testing/util';
import { getWindowDimensions, calcMobileNavOffset } from 'util/layout';

describe('getWindowDimensions', () => {
  test('default values', () => {
    expect(getWindowDimensions()).toEqual({ width: 1024, height: 768 });
  });

  test('width update', () => {
    setViewportWidth(1200);
    expect(getWindowDimensions().width).toBe(1200);
  });
});

describe('calcMobileNavOffset', () => {
  test('without additional offset', () => {
    expect(calcMobileNavOffset(0)).toBe(
      `calc(${MOBILE_NAV_HEIGHT}px + env(safe-area-inset-bottom))`
    );
  });

  test('with additional offset', () => {
    expect(calcMobileNavOffset(123)).toBe(
      `calc(${MOBILE_NAV_HEIGHT + 123}px + env(safe-area-inset-bottom))`
    );
  });

  test('fallback', () => {
    expect(calcMobileNavOffset(0, true)).toBe(MOBILE_NAV_HEIGHT);
    expect(calcMobileNavOffset(123, true)).toBe(MOBILE_NAV_HEIGHT + 123);
  });

  test('embedded environment', () => {
    process.env.NEXT_PUBLIC_CUSTOM_EMBED = 'xyz';
    expect(calcMobileNavOffset(0)).toBe(
      'calc(0px + env(safe-area-inset-bottom))'
    );
    expect(calcMobileNavOffset(123)).toBe(
      'calc(123px + env(safe-area-inset-bottom))'
    );
    expect(calcMobileNavOffset(0, true)).toBe(0);
    expect(calcMobileNavOffset(123, true)).toBe(123);
  });
});
