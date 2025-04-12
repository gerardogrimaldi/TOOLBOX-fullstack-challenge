module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use babel-jest for JavaScript and TypeScript files
  },
  testEnvironment: 'jsdom', // Simulate a browser environment for React components
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Recognize these extensions
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Add this line to use setupTests.js
  silent: false,
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
};