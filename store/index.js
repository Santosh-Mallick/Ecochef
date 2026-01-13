// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import kitchenReducer from './kitchenSlice'; // Import the new slice

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    kitchen: kitchenReducer, // Add it here
  },
});