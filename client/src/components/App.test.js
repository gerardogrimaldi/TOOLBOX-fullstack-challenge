import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../test-utils/redux-test-utils';
import App from './App';
import { fetchFilesData } from '../redux/slices/filesSlice';

jest.mock('./Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./FilesList', () => () => <div data-testid="files-list">FilesList</div>);
jest.mock('./FileData', () => ({ data, loading, error }) => (
  <div data-testid="file-data">
    {loading && <div data-testid="loading">Loading...</div>}
    {error && <div data-testid="error">{error}</div>}
    {!loading && !error && <div data-testid="data">{JSON.stringify(data)}</div>}
  </div>
));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn()
}));

import { useSelector } from 'react-redux';

jest.mock('../redux/slices/filesSlice', () => ({
  fetchFilesData: jest.fn().mockReturnValue({ type: 'files/fetchFilesData/fulfilled' }),
  fetchFilesList: jest.fn().mockReturnValue({ type: 'files/fetchFilesList/fulfilled' }),
  setSelectedFileName: jest.fn().mockReturnValue({ type: 'files/setSelectedFileName' })
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header, file list, and file data sections', async () => {
    useSelector.mockImplementation(() => ({
      data: [],
      status: 'idle',
      error: null,
      selectedFileName: null
    }));

    renderWithRedux(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('files-list')).toBeInTheDocument();
    expect(screen.getByTestId('file-data')).toBeInTheDocument();
    
    expect(screen.getByText('Files Data')).toBeInTheDocument();
    
    expect(screen.getByText(new RegExp(`Toolbox Challenge - ${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  test('fetches files data on initial load', async () => {
    const mockData = [{ file: 'file1.csv', lines: [{ text: 'test', number: 1, hex: 'abc' }] }];
    
    useSelector.mockImplementation(() => ({
      data: mockData,
      status: 'succeeded',
      error: null,
      selectedFileName: null
    }));

    renderWithRedux(<App />);

    expect(fetchFilesData).toHaveBeenCalledTimes(1);
    
    expect(screen.getByTestId('data')).toHaveTextContent(JSON.stringify(mockData));
  });

  test('handles API error properly', async () => {
    const errorMessage = 'Failed to load data';
    
    useSelector.mockImplementation(() => ({
      data: [],
      status: 'failed',
      error: errorMessage,
      selectedFileName: null
    }));

    renderWithRedux(<App />);

    expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
  });
});