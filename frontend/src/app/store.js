import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/credit/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
