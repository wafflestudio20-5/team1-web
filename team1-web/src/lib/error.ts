import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosErrorHandler = (err: unknown, message: string) => {
  if (axios.isAxiosError(err)) {
    const resMsg = err.response?.data.message;
    const errorMsg = `${message}${resMsg ? ': ' + resMsg : ''}`;
    toast.error(errorMsg);
    return errorMsg;
  } else throw err;
};

export const axiosErrorStatus = (err: unknown) =>
  axios.isAxiosError(err) && (err.response?.status ?? null);
