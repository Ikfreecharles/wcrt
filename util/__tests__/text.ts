import {
  excerpt,
  breakLines,
  mapMarkdownElements,
  mapLinkElements,
} from 'util/text';

describe('excerpt', () => {
  test.each([
    ['after word', 'Lorem ipsum dolor', 11],
    ['after space', 'Lorem ipsum dolor', 12],
    ['after punctuation', 'Lorem ipsum, dolor', 12],
    ['after punctuation and space', 'Lorem ipsum, dolor', 13],
    ['after ellipsis', 'Lorem ipsum... dolor', 14],
    ['after space and ellipsis', 'Lorem ipsum ... dolor.', 15],
    ['within word', 'Lorem ipsum dolor', 14],
    ['within word after punctuation', 'Lorem ipsum, dolor', 15],
    ['within word after ellipsis', 'Lorem ipsum... dolor', 17],
  ])('truncate %s', (_name, text, position) => {
    expect(excerpt(text, position + 2)).toBe('Lorem ipsum …');
  });
});

describe('breakLines', () => {
  test('simple line break', () => {
    expect(breakLines('first\nsecond')).toEqual(['first', 'second']);
  });

  test('different line breaks', () => {
    expect(breakLines('first\nsecond\r\nthird\rfourth')).toEqual([
      'first',
      'second',
      'third',
      'fourth',
    ]);
  });

  test('line break with whitespace', () => {
    expect(breakLines(' first \n second ')).toEqual(['first', 'second']);
  });

  test('no line break', () => {
    expect(breakLines('first second')).toEqual(['first second']);
  });
});

describe('mapMarkdownElements', () => {
  const mapFunction = jest.fn();
  const sampleMarkdown = `First paragraph

Second paragraph`;

  test('function calls', () => {
    mapMarkdownElements(sampleMarkdown, mapFunction);
    expect(mapFunction).toHaveBeenCalledTimes(3);
    expect(mapFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paragraph',
        text: 'First paragraph',
      }),
      0,
      expect.anything()
    );
    expect(mapFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'space',
      }),
      1,
      expect.anything()
    );
    expect(mapFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'paragraph',
        text: 'Second paragraph',
      }),
      2,
      expect.anything()
    );
  });
});

describe('mapLinkElements', () => {
  const mapFunction = jest.fn();
  const sampleMarkdown = `[Manual link](http://example.com) followed by an auto link: http://example.com/auto`;

  test('function calls', () => {
    mapLinkElements(sampleMarkdown, mapFunction);
    expect(mapFunction).toHaveBeenCalledTimes(2);
    expect(mapFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'link',
        text: 'Manual link',
        href: 'http://example.com',
      }),
      0
    );
    expect(mapFunction).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'link',
        text: 'http://example.com/auto',
        href: 'http://example.com/auto',
      }),
      2
    );
  });
});
