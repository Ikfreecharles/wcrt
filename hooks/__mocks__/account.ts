import { submit } from 'testing/util';

export const useAccountContactSubmit =
  () =>
  async (...args: any) =>
    submit('accountContact', ...args);

export const useAccountPasswordSubmit =
  () =>
  async (...args: any) =>
    submit('accountPassword', ...args);
