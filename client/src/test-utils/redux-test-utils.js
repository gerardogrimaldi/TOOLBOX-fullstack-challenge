import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../redux/slices/filesSlice';

const defaultInitialState = {
  data: [],
  files: [],
  selectedFileName: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  filesListStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filesListError: null
};

export function renderWithRedux(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        files: filesReducer,
      },
      preloadedState: {
        files: {
          ...defaultInitialState,
          ...(preloadedState.files || {})
        }
      }
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export function createMockStore(initialState = {}) {
  return configureStore({
    reducer: {
      files: filesReducer
    },
    preloadedState: {
      files: {
        ...defaultInitialState,
        ...initialState
      }
    }
  });
}