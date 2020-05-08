import { createSlice } from '@reduxjs/toolkit';

export const loggedinSlice = createSlice({
  name: 'loggedin',
  initialState: {
    value: 0,
  },
  reducers: {
    setLoggedin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoggedin } = loggedinSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(setLoggedin(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.loggedin.value)`
export const selectIsLoggedin = state => state.loggedin.value;

export default loggedinSlice.reducer;
