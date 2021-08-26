/** Make some mandatory properties optional. */
export type SomePartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/** Make some optional properties mandatory. */
export type SomeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** Transform all optional properties to required properties that may be undefined. */
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};
