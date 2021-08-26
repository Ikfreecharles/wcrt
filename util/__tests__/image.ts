import { getFullImageUrl, getResizedImageUrl } from 'util/image';

describe('getFullImageUrl', () => {
  test('full URL', () => {
    expect(
      getFullImageUrl('https://cdn.dev.we-create.io/images/123/abc.jpg')
    ).toBe('https://cdn.dev.we-create.io/images/123/abc.jpg');
  });

  test('with leading slash', () => {
    expect(getFullImageUrl('/images/123/abc.jpg')).toBe(
      'https://cdn.dev.we-create.io/images/123/abc.jpg'
    );
  });

  test('without leading slash', () => {
    expect(getFullImageUrl('images/123/abc.jpg')).toBe(
      'https://cdn.dev.we-create.io/images/123/abc.jpg'
    );
  });

  test('undefined', () => {
    expect(getFullImageUrl(undefined)).toBe(undefined);
  });
});

describe('getResizedImageUrl', () => {
  test('Thumbor options', () => {
    expect(
      getResizedImageUrl(
        'https://cdn.dev.we-create.io/images/123/abc.jpg',
        'content'
      )
    ).toBe(
      'https://cdn.dev.we-create.io/images/1200x675/smart/filters:format(jpeg):max_bytes(100000):background_color(white)/123/abc.jpg'
    );
  });

  test('undefined', () => {
    expect(getResizedImageUrl(undefined, 'content')).toBe(undefined);
  });
});
