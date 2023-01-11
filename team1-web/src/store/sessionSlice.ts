import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiLogin, apiLogout } from '../lib/api';
import { axiosErrorHandler } from '../lib/error';
import { RootState } from '.';



const login = createAsyncThunk(
  'sessionSlice/login',
  async (loginData: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiLogin(loginData);
      return response.data;
    } catch (e) {
      axiosErrorHandler('아이디와 비밀번호를 확인해주세요')(e);
      return rejectWithValue(e);
    }
  }
);

const logout = createAsyncThunk(
  'sessionSlice/logout',
  async (token: string, {rejectWithValue})=> {
    try {
      const token = useSelector((state: RootState) => {
        return state.session.token
      })
      const response = await apiLogout(token);
      
    }
  } 
);

const sessionSlice = createSlice({
  name: 'sessionSlice',
  initialState: { authed: false, token: null /*user*/ },
  reducers: {},
  extraReducers: {
    // [login.pending.type]: (state) => {
    // state.status = 'loading';
    // }
    [login.fulfilled.type]: (state, { payload }) => {
      // state.status = 'success';
      state.authed = true;
      state.token = payload.accessToken;
    },
    // [login.rejected.type]: (state, action) => {
    // state.status: 'failed';

    // }
  },
});

export default sessionSlice;
