import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import themeSlice from '../features/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeSlice
  },
});
