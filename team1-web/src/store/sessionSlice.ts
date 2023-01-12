import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiKakaoSignup, apiKakaoLogin, apiLogin, apiLogout } from '../lib/api';
import { axiosErrorHandler, axiosErrorStatus } from '../lib/error';
import { toast } from 'react-toastify';
import { User } from '../lib/types';

export const kakaoLogin = createAsyncThunk(
  'sessionSlice/kakaoLogin',
  async (code: any, { rejectWithValue }) => {
    try {
      const { data } = await apiKakaoLogin(code);
      return data;
    } catch (e) {
      if (axiosErrorStatus(e) === 404) {
        try {
          const { data } = await apiKakaoSignup(code);
          return data;
        } catch (e) {
          return rejectWithValue(e);
        }
      }
      return rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk(
  'sessionSlice/login',
  async (loginData: { id: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiLogin(loginData);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk(
  'sessionSlice/logout',
  async (token: string | null, { rejectWithValue }) => {
    try {
      const response = await apiLogout(token);
      return response;
    } catch (e) {
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
    [login.rejected.type]: (state, { payload }) => {
      // state.status = 'failed';
      axiosErrorHandler('아이디와 비밀번호를 확인해주세요', payload);
    },

    // [logout.pending.type]: (state) => {
    // state.status = 'loading';
    // },
    [logout.fulfilled.type]: (state) => {
      // state.status = 'success';
      state.token = null;
      toast.success('로그아웃되었습니다.');
    },
    [logout.rejected.type]: (state, { payload }) => {
      // state.status = 'failed';
      axiosErrorHandler('로그인되어있지 않습니다', payload);
    },

    // [kakoLogin.pending.type]: (state) => {
    // state.status = 'loading';
    // },
    [kakaoLogin.fulfilled.type]: (state, { payload }) => {
      // state.status = 'success';
      state.token = payload.accessToken;
      toast.success('로그인되었습니다.');
    },
    [kakaoLogin.rejected.type]: (state, { payload }) => {
      // state.status = 'failed';
      axiosErrorHandler('로그인에 실패했습니다', payload);
    },
  },
});

export default sessionSlice;
