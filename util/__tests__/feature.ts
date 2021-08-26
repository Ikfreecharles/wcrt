import { evalFeatureFlag, getFeatureFlags } from 'util/feature';

describe('getFeatureFlags', () => {
  test('deactivated', () => {
    process.env.NEXT_PUBLIC_FEATURE_SEARCH = 'false';
    expect(getFeatureFlags()).toEqual({
      showGlobalSearchInput: false,
      showGlobalSearchPage: false,
      showSubscribeButton: false,
    });
  });

  test('activated', () => {
    process.env.NEXT_PUBLIC_FEATURE_SEARCH = 'true';
    expect(getFeatureFlags()).toEqual({
      showGlobalSearchInput: true,
      showGlobalSearchPage: true,
      showSubscribeButton: false,
    });
  });
});

describe('evalFeatureFlag', () => {
  test('deactivated', () => {
    process.env.NEXT_PUBLIC_FEATURE_SEARCH = 'false';
    expect(evalFeatureFlag('showGlobalSearchInput')).toEqual(false);
  });

  test('activated', () => {
    process.env.NEXT_PUBLIC_FEATURE_SEARCH = 'true';
    expect(evalFeatureFlag('showGlobalSearchInput')).toEqual(true);
  });
});
