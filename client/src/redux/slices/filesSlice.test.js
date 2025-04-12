import { configureStore } from '@reduxjs/toolkit';
import filesReducer, { 
  fetchFilesData, 
  fetchFilesList, 
  setSelectedFileName 
} from './filesSlice';
import api from '../../services/api';

jest.mock('../../services/api');

describe('Files Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        files: filesReducer
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle initial state', () => {
    expect(store.getState().files).toEqual({
      data: [],
      files: [],
      selectedFileName: null,
      status: 'idle',
      filesListStatus: 'idle',
      error: null,
      filesListError: null
    });
  });

  test('should handle setSelectedFileName', () => {
    const fileName = 'test.csv';
    store.dispatch(setSelectedFileName(fileName));
    expect(store.getState().files.selectedFileName).toEqual(fileName);
  });

  test('should handle fetchFilesData fulfilled', async () => {
    const mockData = [
      {
        file: 'file1.csv',
        lines: [{text: 'Sample', number: 123, hex: '0123456789abcdef0123456789abcdef'}]
      }
    ];
    
    api.getFilesData.mockResolvedValueOnce(mockData);
    
    await store.dispatch(fetchFilesData());
    
    expect(store.getState().files.status).toEqual('succeeded');
    expect(store.getState().files.data).toEqual(mockData);
    expect(store.getState().files.error).toBeNull();
  });

  test('should handle fetchFilesData rejected', async () => {
    const errorMessage = 'Failed to load files data';
    api.getFilesData.mockRejectedValueOnce(new Error(errorMessage));
    
    await store.dispatch(fetchFilesData());
    
    expect(store.getState().files.status).toEqual('failed');
    expect(store.getState().files.error).not.toBeNull();
  });

  test('should handle fetchFilesList fulfilled', async () => {
    const mockFiles = ['file1.csv', 'file2.csv'];
    api.getFilesList.mockResolvedValueOnce(mockFiles);
    
    await store.dispatch(fetchFilesList());
    
    expect(store.getState().files.filesListStatus).toEqual('succeeded');
    expect(store.getState().files.files).toEqual(mockFiles);
  });

  test('should handle fetchFilesList rejected', async () => {
    api.getFilesList.mockRejectedValueOnce(new Error('API error'));
    
    await store.dispatch(fetchFilesList());
    
    expect(store.getState().files.filesListStatus).toEqual('failed');
    expect(store.getState().files.filesListError).not.toBeNull();
  });
});