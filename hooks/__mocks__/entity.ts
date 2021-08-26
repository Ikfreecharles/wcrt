import { submit } from 'testing/util';

export const useEntityDelete =
  () =>
  async (...args: any) =>
    submit('delete', ...args);
