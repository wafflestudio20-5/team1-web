import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiKakaoSignup,
  apiKakaoLogin,
  apiLogin,
  apiLogout,
  apiChangeUserInfo,
  apiSubmitVerifyCode,
  apiGoogleLogin,
  apiGoogleSignup,
} from '../lib/api';
import { axiosErrorHandler, axiosErrorStatus } from '../lib/error';
import { toast } from 'react-toastify';

export const kakaoLogin = createAsyncThunk(
  'sessionSlice/kakaoLogin',
  async (code: any, { rejectWithValue }) => {
    try {
      const { data } = await apiKakaoLogin(code);
      return data;
    } catch (e) {
      const error = axiosErrorHandler(e, '로그인에 실패했습니다');
      return rejectWithValue(error);
    }
  }
);

export const kakaoSignup = createAsyncThunk(
  'sessionSlice/kakaoSignup',
  async (params: { code: any, nickname: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiKakaoSignup(params.code, params.nickname);
      return data;
    } catch (e) {
      const error = axiosErrorHandler(e, '로그인에 실패했습니다');
      return rejectWithValue(error);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'sessionSlice/googleLogin',
  async (code: any, { rejectWithValue }) => {
    try {
      const { data } = await apiGoogleLogin(code);
      return data;
    } catch (e) {
      const error = axiosErrorHandler(e, '로그인에 실패했습니다');
      return rejectWithValue(error);
    }
  }
);

export const googleSignup = createAsyncThunk(
  'sessionSlice/googleSignup',
  async (params: { code: any, nickname: string }, { rejectWithValue }) => {
    try {
      const { data } = await apiGoogleSignup(params.code, params.nickname);
      return data;
    } catch (e) {
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
      const error: string = axiosErrorHandler(e, '아이디 또는 비밀번호를 확인해주세요');
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

export const verifyEmail = createAsyncThunk(
  'sessionSlice/verifyEmail',
  async (
    {
      token,
      verifyCode,
    }: {
      token: string | null;
      verifyCode: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiSubmitVerifyCode(token, verifyCode);
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '');
      return rejectWithValue(error);
    }
  }
);

export const changeUserInfo = createAsyncThunk(
  'sessionSlice/changeUserInfo',
  async (
    {
      token,
      newUserInfo,
    }: {
      token: string | null;
      newUserInfo: { oldPassword?: string; newPassword?: string; nickname?: string };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await apiChangeUserInfo(token, newUserInfo);
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '변경에 실패했습니다');
      return rejectWithValue(error);
    }
  }
);

type TSessionSlice = {
  authed: boolean;
  token: string | null;
};

const initialState: TSessionSlice = {
  authed: false,
  token: null,
};

const sessionSlice = createSlice({
  name: 'sessionSlice',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
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
      // })
      .addCase(kakaoLogin.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        if (!payload.needNickname) {
          state.token = payload.authToken.accessToken;
          console.log(payload)
          toast.success('로그인되었습니다.');
        }
      })
      .addCase(kakaoLogin.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(kakaoSignup.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        state.token = payload.authToken.accessToken;
        console.log(payload)
        toast.success('로그인되었습니다.');
      })
      .addCase(kakaoSignup.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        if (!payload.needNickname) {
          state.token = payload.authToken.accessToken;
          console.log(payload)
          toast.success('로그인되었습니다.');
        }
      })
      .addCase(googleLogin.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(googleSignup.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        state.token = payload.authToken.accessToken;
        console.log(payload)
        toast.success('로그인되었습니다.');
      })
      .addCase(googleSignup.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      // .addCase(changeUserInfo.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(changeUserInfo.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        toast.success('변경하였습니다.');
      })
      .addCase(changeUserInfo.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      // .addCase(verifyEmail.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        state.token = payload.accessToken;
        localStorage.setItem('refreshToken', payload.refreshToken);
        toast.success('인증되었습니다.');
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      });
  },
});

export default sessionSlice;
export const { setToken } = sessionSlice.actions;