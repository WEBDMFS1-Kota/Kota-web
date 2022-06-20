import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable  no-param-reassign */

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
    },
    logout: (state) => {
      state.token = null;
      state.isLogged = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const getToken = (state) => state.user.token;

export const isLogged = (state) => state.user.isLogged;

export default userSlice.reducer;
