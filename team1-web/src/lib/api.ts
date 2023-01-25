import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';
import { useState, useLayoutEffect, useCallback } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../store';
import { setToken } from '../store/sessionSlice';
import { axiosErrorStatus } from './error';
import { BoardList, BoardPosts, UserInfo } from './types';

const url = (path: string, param?: Record<string, any>): string => {
  const validParamData =
    param &&
    Object.fromEntries(
      Object.entries(param)
        .filter(([key, value]) => value)
        .map(([key, value]) => [key, String(value)])
    );
  return (
    'http://api.wafflytime.com' +
    path +
    (param ? '?' + new URLSearchParams(validParamData).toString() : '')
  );
};

const auth = (token: string | null) => (token ? { Authorization: `Bearer ${token}` } : {});

const axiosInstance = axios.create();
const axiosTokenInstance = axios.create();

axiosTokenInstance.interceptors.request.use((config) => {
  const accessToken = useAppSelector((state: RootState) => state.session.token);
  if (!accessToken) {
    return Promise.reject('먼저 로그인하세요');
  }
  config.headers = { ...config.headers } as AxiosHeaders;
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

axiosTokenInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  async (error) => {
    const { config: originRequest } = error;
    if (axiosErrorStatus(error) !== 401) return error;
    const dispatch = useAppDispatch();
    try {
      const {
        data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
      } = await apiRefresh();
      dispatch(setToken(newAccessToken));
      localStorage.setItem('refreshToken', newRefreshToken);
      originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios(originRequest);
    } catch (e) {
      dispatch(setToken(null));
      localStorage.removeItem('refreshToken');
      return Promise.reject(e);
    }
  }
);

export const apiLogin = (loginData: { id: string; password: string }) =>
  axios.post(url('/api/auth/local/login'), loginData, {});

export const apiLogout = () => axiosTokenInstance.delete(url('/api/auth/logout'));

export const apiRefresh = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return Promise.reject('토큰 갱신이 불가능합니다. 리프레시 토큰이 없습니다');
  return axiosInstance.put(url('/api/auth/refresh'), null, { headers: auth(refreshToken) });
};

//TODO: code type 수정
export const apiKakaoSignup = (code: any) =>
  // TODO: url 수정
  axiosInstance.post(`http://api.wafflytime.com/api/auth/social/signup/kakao?${code}`);

//TODO: code type 수정
export const apiKakaoLogin = (code: any) =>
  // TODO: url 수정
  axiosInstance.post(`http://api.wafflytime.com/api/auth/social/login/kakao?${code}`);

export const useApiCheckNickname = (nickname: string) => {
  const [data, setData] = useState<string | null>();
  useLayoutEffect(() => {
    axiosInstance
      .get<string>(url(`/api/user/check/nickname/${nickname}`))
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setData(null);
      });
  }, [nickname]);
  return data;
};

export const apiChangeUserInfo = (newUserInfo: { password?: string; nickname?: string }) =>
  axiosTokenInstance.put(url('/api/user/me'), newUserInfo);

export function useApiData<T>(fetch: () => Promise<AxiosResponse<T>>) {
  const [data, setData] = useState<T>();
  useLayoutEffect(() => {
    fetch().then((res) => {
      setData(res.data);
    });
  }, [fetch]);
  return data;
}

export const useApiGetBoardLists = () => () =>
  axiosTokenInstance.get<BoardList[]>(url('/api/boards'));

export const useApiGetMyInfo = () => () => axiosTokenInstance.get<UserInfo>(url('/api/user/me'));

export const useApiGetBoardPosts = (boardId: number, page?: number, size?: number) =>
  useCallback(
    () => axiosTokenInstance.get<BoardPosts>(url(`/api/board/${boardId}/posts`, { page, size })),
    [boardId, page, size]
  );

export const useApiGetBestPosts = (page?: number, size?: number) =>
  useCallback(
    () => axiosTokenInstance.get<BoardPosts>(url(`/api/bestpost`, { page, size })),
    [page, size]
  );
export const useApiGetHotPosts = (page?: number, size?: number) =>
  useCallback(
    () => axiosTokenInstance.get<BoardPosts>(url(`/api/hotpost`, { page, size })),
    [page, size]
  );
export function useApiGetImg(imgUrl: string | null) {
  const [img, setImg] = useState(null);
  useLayoutEffect(() => {
    axios
      .get(imgUrl || 'garbageUrl')
      .then((res) => {
        setImg(res.data);
      })
      .catch(() => {});
  }, [imgUrl]);
  return img;
}
