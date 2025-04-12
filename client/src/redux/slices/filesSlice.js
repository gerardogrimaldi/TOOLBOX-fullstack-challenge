import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchFilesData = createAsyncThunk(
  'files/fetchFilesData',
  async (fileName = null, { rejectWithValue }) => {
    try {
      return await api.getFilesData(fileName);
    } catch (error) {
      return rejectWithValue('Failed to load files data. Please try again later.');
    }
  }
);

export const fetchFilesList = createAsyncThunk(
  'files/fetchFilesList',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getFilesList();
    } catch (error) {
      return rejectWithValue('Error loading files list');
    }
  }
);

const initialState = {
  data: [],
  files: [],
  selectedFileName: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  filesListStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filesListError: null
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setSelectedFileName: (state, action) => {
      state.selectedFileName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFilesList.pending, (state) => {
        state.filesListStatus = 'loading';
        state.filesListError = null;
      })
      .addCase(fetchFilesList.fulfilled, (state, action) => {
        state.filesListStatus = 'succeeded';
        state.files = action.payload;
      })
      .addCase(fetchFilesList.rejected, (state, action) => {
        state.filesListStatus = 'failed';
        state.filesListError = action.payload;
      });
  }
});

export const { setSelectedFileName } = filesSlice.actions;
export default filesSlice.reducer;