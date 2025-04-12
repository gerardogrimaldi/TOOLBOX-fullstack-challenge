import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../test-utils/redux-test-utils';
import FilesList from './FilesList';
import { fetchFilesList, setSelectedFileName } from '../redux/slices/filesSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn()
}));

import { useSelector } from 'react-redux';

jest.mock('../redux/slices/filesSlice', () => ({
  fetchFilesList: jest.fn().mockReturnValue({ type: 'files/fetchFilesList/fulfilled' }),
  setSelectedFileName: jest.fn().mockReturnValue({ type: 'files/setSelectedFileName' })
}));

describe('FilesList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads and displays files on mount', async () => {
    const mockFiles = ['file1.csv', 'file2.csv'];
    
    useSelector.mockImplementation(() => ({
      files: mockFiles,
      filesListStatus: 'succeeded',
      filesListError: null,
      selectedFileName: null
    }));

    renderWithRedux(<FilesList />);

    expect(screen.getByText('All Files')).toBeInTheDocument();
    expect(screen.getByText('file1.csv')).toBeInTheDocument();
    expect(screen.getByText('file2.csv')).toBeInTheDocument();
    
    expect(fetchFilesList).toHaveBeenCalledTimes(1);
  });

  test('calls onFileSelect with selected filename when Apply Filter is clicked', async () => {
    const mockFiles = ['file1.csv', 'file2.csv'];
    
    useSelector.mockImplementation(() => ({
      files: mockFiles,
      filesListStatus: 'succeeded',
      filesListError: null,
      selectedFileName: null
    }));

    renderWithRedux(<FilesList />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'file1.csv' } });
    
    fireEvent.click(screen.getByText('Apply Filter'));
    
    expect(setSelectedFileName).toHaveBeenCalledWith('file1.csv');
  });

  test('calls onFileSelect with null when Show All is clicked', async () => {
    const mockFiles = ['file1.csv', 'file2.csv'];
    
    useSelector.mockImplementation(() => ({
      files: mockFiles,
      filesListStatus: 'succeeded',
      filesListError: null,
      selectedFileName: 'file1.csv'
    }));

    renderWithRedux(<FilesList />);

    expect(screen.getByRole('combobox').value).toBe('file1.csv');
    
    fireEvent.click(screen.getByText('Show All'));
    
    expect(setSelectedFileName).toHaveBeenCalledWith(null);
  });

  test('handles API error properly', async () => {
    const errorMessage = 'Error loading files';
    
    useSelector.mockImplementation(() => ({
      files: [],
      filesListStatus: 'failed',
      filesListError: errorMessage,
      selectedFileName: null
    }));

    renderWithRedux(<FilesList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});