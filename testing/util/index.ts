export * from '@testing-library/react';
export { renderHook } from '@testing-library/react-hooks';
export { default as userEvent } from '@testing-library/user-event';

export {
  TestingContext,
  renderWithContext as render,
  renderBeforeEach,
} from './render';

export * from './variables';
export * from './i18n';
export * from './graphql';
export * from './data';
export * from './device';
