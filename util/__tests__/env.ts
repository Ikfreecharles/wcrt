import { isServerSide, isEmbedded, isTrueEnv } from 'util/env';

describe('isServerSide', () => {
  test('testing environment', () => {
    expect(isServerSide).toBe(false);
  });
});

describe('isEmbedded', () => {
  test('undefined environment variable', () => {
    expect(isEmbedded()).toBe(false);
  });

  test('defined environment variable', () => {
    process.env.NEXT_PUBLIC_CUSTOM_EMBED = 'test';
    expect(isEmbedded()).toBe(true);
  });

  test('not matching environment variable', () => {
    process.env.NEXT_PUBLIC_CUSTOM_EMBED = 'test';
    expect(isEmbedded('sample')).toBe(false);
  });

  test('matching environment variable', () => {
    process.env.NEXT_PUBLIC_CUSTOM_EMBED = 'test';
    expect(isEmbedded('test')).toBe(true);
  });
});

describe('isTrueEnv', () => {
  test('lowercase strings', () => {
    expect(isTrueEnv('true')).toBe(true);
    expect(isTrueEnv('false')).toBe(false);
  });

  test('uppercase strings', () => {
    expect(isTrueEnv('TRUE')).toBe(true);
    expect(isTrueEnv('FALSE')).toBe(false);
  });

  test('fallback', () => {
    expect(isTrueEnv('xyz')).toBe(false);
  });
});
