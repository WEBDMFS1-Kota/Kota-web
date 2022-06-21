import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
/* eslint-disable  no-param-reassign */

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    token: null,
    userID: null,
    pseudo: '',
    avatar: '',
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.isLogged = true;
      const tokenDecoded = jwtDecode(action.payload);
      state.userID = tokenDecoded.userId;
      state.pseudo = tokenDecoded.pseudo;
      state.avatar = tokenDecoded.avatar ? tokenDecoded.avatar : `${process.env.PUBLIC_URL}/default-avatar.jpg`;
    },
    logout: (state) => {
      state.token = null;
      state.isLogged = false;
      state.userId = null;
    },
    updateUserInfos: (state, action) => {
      state.pseudo = action.payload.pseudo || state.pseudo;
      state.avatar = action.payload.avatar || state.avatar;
    },
  },
});

export const { login, logout, updateUserInfos } = userSlice.actions;

export const getToken = (state) => state.user.token;

export const getPseudo = (state) => state.user.pseudo;

export const getAvatar = (state) => state.user.avatar;

export const isLogged = (state) => state.user.isLogged;

export default userSlice.reducer;
