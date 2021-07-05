import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    subscribe: (state, action) => {
      state.user.subscription = action.payload
    }
  },
});


export const { login, logout, subscribe } = userSlice.actions;

export const selectUser = (state) => state.user.user;


export default userSlice.reducer;
