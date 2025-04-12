import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './slices/filesSlice';

const store = configureStore({
  reducer: {
    files: filesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;