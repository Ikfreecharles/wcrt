import { getListValidation } from 'util/validation';

describe('getListValidation', () => {
  describe('undefined rules', () => {
    const validate = getListValidation(undefined);

    test('default', () => {
      expect(validate(['first', 'second', 'third'])).toBe(true);
    });

    test('singleton', () => {
      expect(validate(['first'])).toBe(true);
    });

    test('empty', () => {
      expect(validate([])).toBe(true);
    });

    test('undefined', () => {
      expect(validate(undefined)).toBe(true);
    });
  });

  describe('required', () => {
    const validate = getListValidation({ required: true });

    test('default', () => {
      expect(validate(['first', 'second', 'third'])).toBe(true);
    });

    test('singleton', () => {
      expect(validate(['first'])).toBe(true);
    });

    test('empty', () => {
      expect(validate([])).toBe(false);
    });

    test('undefined', () => {
      expect(validate(undefined)).toBe(false);
    });
  });

  describe('minimum length', () => {
    const validate = getListValidation({ minLength: 2 });

    test('default', () => {
      expect(validate(['first', 'second', 'third'])).toBe(true);
    });

    test('singleton', () => {
      expect(validate(['first'])).toBe(false);
    });

    test('empty', () => {
      expect(validate([])).toBe(false);
    });

    test('undefined', () => {
      expect(validate(undefined)).toBe(false);
    });
  });

  describe('maximum length', () => {
    const validate = getListValidation({ maxLength: 2 });

    test('default', () => {
      expect(validate(['first', 'second', 'third'])).toBe(false);
    });

    test('singleton', () => {
      expect(validate(['first'])).toBe(true);
    });

    test('empty', () => {
      expect(validate([])).toBe(true);
    });

    test('undefined', () => {
      expect(validate(undefined)).toBe(true);
    });
  });
});
