import {
  getEntityPath,
  getInternalPath,
  raisePathLevel,
  createAbsoluteUrl,
  comparePaths,
  extractQueryParameters,
} from 'util/url';

describe('getEntityPath', () => {
  test('article', () => {
    expect(getEntityPath('T:123:Article')).toBe('/article/123');
  });

  test('topic', () => {
    expect(getEntityPath('T:123:Topic')).toBe('/topic/123');
  });

  test('impulse', () => {
    expect(getEntityPath('T:123:Topic')).toBe('/topic/123');
  });

  test('profile', () => {
    expect(getEntityPath('T:123:Person')).toBe('/profile/123');
  });
});

describe('getInternalPath', () => {
  test('group index', () => {
    expect(getInternalPath('T:123:Group')).toBe('/groups/123');
  });

  test('group tool', () => {
    expect(getInternalPath('T:123:Group', '/something')).toBe(
      '/groups/123/something'
    );
  });
});

describe('raisePathLevel', () => {
  test('default', () => {
    expect(raisePathLevel('/some/thing')).toBe('/some');
  });

  test('closing slash', () => {
    expect(raisePathLevel('/some/thing/')).toBe('/some');
  });

  test('top level', () => {
    expect(raisePathLevel('/some')).toBe('/');
  });

  test('root', () => {
    expect(raisePathLevel('/')).toBe('/');
  });
});

describe('createAbsoluteUrl', () => {
  test('with query string', () => {
    expect(createAbsoluteUrl('article/abc?something=special')).toMatchObject({
      href: 'https://dev.we-create.io/article/abc?something=special',
    });
  });

  test('without query string', () => {
    expect(
      createAbsoluteUrl('article/abc?something=special', true)
    ).toMatchObject({
      href: 'https://dev.we-create.io/article/abc',
    });
  });
});

describe('comparePaths', () => {
  test('direct match', () => {
    expect(comparePaths('/path/one', ['/path/one'])).toBe(true);
    expect(comparePaths('/path/two?something', ['/path/two'])).toBe(true);
    expect(comparePaths('/path/three', ['/', '/path/something'])).toBe(false);
  });

  test('nested match', () => {
    expect(comparePaths('/path/one', ['/path/*'])).toBe(true);
    expect(comparePaths('/path/two?something', ['/path/*'])).toBe(true);
    expect(
      comparePaths('/path/three', ['/something/*', '/path/something/*'])
    ).toBe(false);
  });
});

describe('extractQueryParameters', () => {
  const sampleQuery = { sampleString: 'test', sampleArray: ['a', 'b', 'c'] };

  test('undefined', () => {
    expect(extractQueryParameters(sampleQuery, ['notFound'])).toEqual({
      notFound: [],
    });
  });

  test('sanitized values', () => {
    expect(
      extractQueryParameters(sampleQuery, ['sampleString', 'sampleArray'])
    ).toEqual({
      sampleString: ['test'],
      sampleArray: ['a', 'b', 'c'],
    });
  });
});
