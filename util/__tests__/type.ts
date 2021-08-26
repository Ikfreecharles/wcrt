import { hasProperty, toArray } from 'util/type';

describe('hasProperty', () => {
  test('undefined', () => {
    expect(hasProperty(undefined, 'test')).toBe(false);
  });

  test('null', () => {
    expect(hasProperty(null, 'test')).toBe(false);
  });

  test('boolean', () => {
    expect(hasProperty(true, 'test')).toBe(false);
    expect(hasProperty(false, 'test')).toBe(false);
  });

  test('array', () => {
    expect(hasProperty([], 'test')).toBe(false);
    expect(hasProperty([true], 'test')).toBe(false);
  });

  test('empty object', () => {
    expect(hasProperty({}, 'test')).toBe(false);
  });

  test('implicit undefined property', () => {
    expect(hasProperty({ someProperty: true }, 'test')).toBe(false);
  });

  test('explicit undefined property', () => {
    expect(hasProperty({ test: undefined }, 'test')).toBe(false);
  });

  test('defined property', () => {
    expect(hasProperty({ test: true }, 'test')).toBe(true);
  });
});

describe('toArray', () => {
  test('undefined', () => {
    expect(toArray(undefined)).toEqual([]);
  });

  test('string', () => {
    expect(toArray('test')).toEqual(['test']);
  });

  test('array', () => {
    expect(toArray(['test'])).toEqual(['test']);
  });
});
