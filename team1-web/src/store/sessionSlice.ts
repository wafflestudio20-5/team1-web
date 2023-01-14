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
          const error: string = axiosErrorHandler(e, '로그인에 실패했습니다');
          return rejectWithValue(error);
        }
      }
      const error = axiosErrorHandler(e, '로그인에 실패했습니다');
      return rejectWithValue(error);
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
      const error: string = axiosErrorHandler(
        e,
        '아이디 또는 비밀번호를 확인해주세요'
      );
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'sessionSlice/logout',
  async (token: string | null, { rejectWithValue }) => {
    try {
      const { data } = await apiLogout(token);
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '로그인되어있지 않습니다');
      return rejectWithValue(error);
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
  extraReducers: (builder) => {
    builder
      // .addCase(login.pending, (state) => {
      // state.status = 'loading'
      // })
      .addCase(login.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        state.token = payload.accessToken;
        toast.success('로그인되었습니다.');
      })
      .addCase(login.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      // .addCase(logout.pending, (state) => {
      // state.status = 'loading'
      // })
      .addCase(logout.fulfilled, (state) => {
        // state.status = 'success';
        state.token = null;
        toast.success('로그아웃되었습니다.');
      })
      .addCase(logout.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      // .addCase(kakaoLogin.pending, (state) => {
      //   state.status = 'loading';
      // });
      .addCase(kakaoLogin.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        state.token = payload.accessToken;
        toast.success('로그인되었습니다.');
      })
      .addCase(kakaoLogin.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      });
  },
});

export default sessionSlice;
