module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'dotenv/config',
    '<rootDir>/testing/setup',
  ],
  moduleDirectories: ['<rootDir>', 'node_modules'],
  watchPathIgnorePatterns: ['<rootDir>/.next'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgr',
  },
  clearMocks: true,
  testTimeout: 20000,
};
