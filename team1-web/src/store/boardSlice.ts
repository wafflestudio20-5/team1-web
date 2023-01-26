import { createSlice } from '@reduxjs/toolkit';
import { Menu } from '../lib/types';

type TBoardSlice = {
  selectedBoardId: number | null;
};

const initialState: TBoardSlice = {
  selectedBoardId: null,
};

const boardSlice = createSlice({
  name: 'boardSlice',
  initialState,
  reducers: {
    setSelectedBoardId: (state, { payload }) => {
      state.selectedBoardId = payload;
    },
  },
});

export default boardSlice;
export const { setSelectedBoardId } = boardSlice.actions;
