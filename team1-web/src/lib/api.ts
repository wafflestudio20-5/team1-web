import axios from 'axios';
import { AxiosResponse } from 'axios';
import { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { Board, BoardList, BoardPosts, ChatList, HomeBoardPosts, Post, UserInfo } from './types';

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

export const useApiCheckNickname = (nickname: string) => {
  const [data, setData] = useState<string | null>();
  useLayoutEffect(() => {
    axios
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

export const apiChangeUserInfo = (
  token: string | null,
  newUserInfo: { password?: string; nickname?: string }
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

export const useApiGetBoardPosts = (
  token: string | null,
  boardId: number,
  page?: number,
  size?: number
) =>
  useCallback(
    () =>
      axios.get<BoardPosts>(url(`/api/board/${boardId}/posts`, { page, size }), {
        headers: auth(token),
      }),
    [token, boardId, page, size]
  );

export const useApiGetHomePosts = (token: string | null) =>
  useCallback(
    () => axios.get<HomeBoardPosts[]>(url('/api/homeposts'), { headers: auth(token) }),
    [token]
  );

export const useApiGetBestPosts = (token: string | null, page?: number, size?: number) =>
  useCallback(
    () =>
      axios.get<BoardPosts>(url(`/api/bestpost`, { page, size }), {
        headers: auth(token),
      }),
    [token, page, size]
  );
export const useApiGetHotPosts = (token: string | null, page?: number, size?: number) =>
  useCallback(
    () =>
      axios.get<BoardPosts>(url(`/api/hotpost`, { page, size }), {
        headers: auth(token),
      }),
    [token, page, size]
  );
export const useApiGetLatestPosts = (token: string | null, category: string, size?: number) =>
  useCallback(
    () => axios.get<Post[]>(url('/api/latestposts', { category, size }), { headers: auth(token) }),
    [token, category, size]
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

export const useApiGetBoardSearchResult = (token: string | null, keyword: string) =>
  useCallback(
    () =>
      keyword
        ? axios.get<Board[]>(url('/api/boards/search', { keyword }), { headers: auth(token) })
        : Promise.reject(),
    [token, keyword]
  );


export const useApiGetChats = (token: string | null, page?: number, size?: number) => 
    useCallback(
      () => 
        axios.get<ChatList>(url('/api/chats', { page, size }), {headers: auth(token) }),
        [token, page, size]
    );