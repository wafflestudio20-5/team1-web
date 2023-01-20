import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { BoardList, UserInfo } from './types';

const url = (path: string, param?: Record<string, string>): string =>
  'http://api.wafflytime.com' + path + (param ? '?' + new URLSearchParams(param).toString() : '');

const auth = (token: string | null) => (token ? { Authorization: `Bearer ${token}` } : {});

export const apiLogin = (loginData: { id: string; password: string }) =>
  axios.post(url('/api/auth/local/login'), loginData, {});

export const apiLogout = (token: string | null) =>
  axios.delete(url('/api/auth/logout'), { headers: auth(token) });

//TODO: code type 수정
export const apiKakaoSignup = (code: any) =>
  // TODO: url 수정
  axios.post(`http://api.wafflytime.com/api/auth/social/signup/kakao?${code}`);

//TODO: code type 수정
export const apiKakaoLogin = (code: any) =>
  // TODO: url 수정
  axios.post(`http://api.wafflytime.com/api/auth/social/login/kakao?${code}`);

export const apiChangeUserInfo = (
  token: string | null,
  newUserInfo: { password: string; nickname: string }
) => axios.put(url('/api/user/me'), newUserInfo, { headers: auth(token) });

export function useApiData<T>(fetch: () => Promise<AxiosResponse<T>>) {
  const [data, setData] = useState<T>();
  useLayoutEffect(() => {
    fetch().then((res) => {
      setData(res.data);
    });
  }, [fetch]);
  return data;
}

export const useApiGetBoardLists = (token: string | null) =>
  useCallback(() => axios.get<BoardList[]>(url('/api/boards'), { headers: auth(token) }), [token]);

export const useApiGetMyInfo = (token: string | null) =>
  useCallback(() => axios.get<UserInfo>(url('/api/user/me'), { headers: auth(token) }), [token]);

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
