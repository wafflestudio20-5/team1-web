import axios from 'axios';

const url = (path: string, param?: Record<string, string>): string =>
  'http://api.wafflytime.com' +
  path +
  +(param ? '?' + new URLSearchParams(param).toString() : '');

const auth = (token: string | null) =>
  token ? { Authorization: `Bearer ${token}` } : {};

export const apiLogin = (loginData: { id: string; password: string }) =>
  axios.post(url('/api/auth/local/login'), loginData, {});

export const apiLogout = (token: string | null) =>
  axios.delete('/api/auth/logout', { headers: auth(token) });
