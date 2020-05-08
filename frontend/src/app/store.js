import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/credit/counterSlice';
import loggedinReducer from '../app/reducers/user.reducer'

export default configureStore({
  reducer: {
    counter: counterReducer,
    loggedin: loggedinReducer
  },
});
