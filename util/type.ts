/** Determines if the given input is an object and has a specific property. */
export const hasProperty = <T extends unknown, K extends string>(
  input: T,
  key: K
): input is T & Record<K, unknown> =>
  !!input &&
  typeof input === 'object' &&
  typeof (input as Record<K, unknown>)[key] !== 'undefined';

/**
 * Converts a given input to a string while using an empty string for `null` and
 * `undefined`.
 */
export const toString = (input: unknown) => {
  if (input == null) return '';
  return String(input);
};

/**
 * Converts a given input to an array while using an empty array for `null` and
 * `undefined`.
 */
export const toArray = <T>(input: T | T[] | null | undefined) => {
  if (Array.isArray(input)) return input;
  if (input) return [input];
  return [];
};

/** Determines the type of a GraphQL object based on the `__typename` field. */
export const isDataOfType = <T extends { __typename: string }>(
  item: { __typename: string },
  typeNameToCheck: string
): item is T => item.__typename === typeNameToCheck;
