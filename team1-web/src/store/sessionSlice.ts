import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { apiLogin, apiLogout } from '../lib/api';
import { axiosErrorHandler } from '../lib/error';
import { RootState } from '.';
import { toast } from 'react-toastify';
import { User } from '../lib/types';

const login = createAsyncThunk(
  'sessionSlice/login',
  async (loginData: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiLogin(loginData);
      return data;
    } catch (e) {
      axiosErrorHandler('아이디와 비밀번호를 확인해주세요')(e);
      return rejectWithValue(e);
    }
  }
);

const logout = createAsyncThunk(
  'sessionSlice/logout',
  async (token: string, { rejectWithValue }) => {
    try {
      const { token } = useSelector((state: RootState) => {
        return state.session.token;
      });
      const { data } = await apiLogout(token);
      return data;
    } catch (e) {
      axiosErrorHandler('로그인되어있지 않습니다');
      return rejectWithValue(e);
    }
  }
);

type TSessionSlice = {
  authed: boolean;
  token: string | null;
  // user: User;
};

const initialState: TSessionSlice = {
  authed: false,
  token: null,
};

const sessionSlice = createSlice({
  name: 'sessionSlice',
  initialState,
  reducers: {},
  extraReducers: {
    // [login.pending.type]: (state) => {
    // state.status = 'loading';
    // }
    [login.fulfilled.type]: (state, { payload }) => {
      // state.status = 'success';
      state.token = payload.accessToken;
      toast.success('로그인되었습니다.');
    },
    // [login.rejected.type]: (state, action) => {
    // state.status = 'failed';
    // },

    // [logout.pending.type]: (state) => {
    // state.status = 'loading';
    // },
    [logout.fulfilled.type]: (state, { payload }) => {
      // state.status = 'success';
      state.token = null;
      toast.success('로그아웃되었습니다.');
    },
    // [logout.rejected.type]: (state, action) {
    // state.status = 'failed';
    // }
  },
});

export default sessionSlice;
