import mediaQuery from 'css-mediaquery';

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  media: 'screen',
  onchange: () => jest.fn(),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  addEventListener: () => jest.fn(),
  removeEventListener: () => jest.fn(),
  dispatchEvent: () => true,
});

export const setViewportWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: createMatchMedia(width),
  });
};
