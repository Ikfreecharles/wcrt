import { getOpenGraphLocale } from 'util/meta';

describe('getOpenGraphLocale', () => {
  test('de -> de_DE', () => {
    expect(getOpenGraphLocale('de')).toBe('de_DE');
  });

  test('en -> en_US', () => {
    expect(getOpenGraphLocale('en')).toBe('en_US');
  });
});
