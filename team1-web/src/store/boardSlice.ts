import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiCreatePost, apiCreateReply, apiDeletePost, apiDeleteReply } from '../lib/api';
import { axiosErrorHandler } from '../lib/error';
import { Menu, Reply } from '../lib/types';

type TBoardSlice = {
  selectedBoardId: number | null;
};

const initialState: TBoardSlice = {
  selectedBoardId: null,
};

export const createPost = createAsyncThunk(
  'boardSlice/post/create',
  async (params: {
    token: string | null,
    boardId: number,
    title: string | null,
    contents: string,
    isQuestion: boolean,
    isWriterAnonymous: boolean
  }, { rejectWithValue }) => {
    try {
      const { data } = await apiCreatePost(params)
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '잘못된 요청입니다');
      return rejectWithValue(error)
    }
  }
);

export const createReply = createAsyncThunk(
  'boardSlice/reply/create',
  async (params: {
    token: string | null,
    boardId: number,
    postId: number,
    contents: string,
    parent: number | null,
    isWriterAnonymous: boolean
  }, { rejectWithValue }) => {
    try {
      const { data } = await apiCreateReply(params)
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '잘못된 요청입니다');
      return rejectWithValue(error)
    }
  }
);

export const deletePost = createAsyncThunk(
  'boardSlice/post/delete',
  async (params: {
    token: string | null,
    boardId: number,
    postId: number
  }, { rejectWithValue }) => {
    try {
      const { data } = await apiDeletePost(params)
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '잘못된 요청입니다');
      return rejectWithValue(error)
    }
  }
);

export const deleteReply = createAsyncThunk(
  'boardSlice/reply/delete',
  async (params: {
    token: string | null,
    boardId: number,
    postId: number,
    replyId: number
  }, { rejectWithValue }) => {
    try {
      const { data } = await apiDeleteReply(params)
      return data;
    } catch (e) {
      const error: string = axiosErrorHandler(e, '잘못된 요청입니다');
      return rejectWithValue(error)
    }
  }
);

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    setSelectedBoardId: (state, { payload }) => {
      state.selectedBoardId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReply.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        toast.success('댓글 작성에 성공했습니다.');
      })
      .addCase(createReply.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        toast.success('게시물 작성에 성공했습니다.');
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        toast.success('게시물을 삭제하였습니다.');
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      })
      .addCase(deleteReply.fulfilled, (state, { payload }) => {
        // state.status = 'success';
        toast.success('댓글을 삭제하였습니다.');
      })
      .addCase(deleteReply.rejected, (state, { payload }) => {
        // state.status = 'failed';
        throw payload;
      });
  }
});

export default boardSlice;
export const { setSelectedBoardId } = boardSlice.actions;
