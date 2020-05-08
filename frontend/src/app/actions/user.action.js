import { createSlice } from '@reduxjs/toolkit';

export const UserActions = createSlice({
  name: 'loggedin',
  initialState: {
    value: false
  },
  reducers: {
    setLoggedin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setLoggedin } = UserActions.actions;