require('@testing-library/jest-dom');

jest.mock('./services/api', () => ({
  getFilesData: jest.fn(),
  getFilesList: jest.fn()
}));

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});