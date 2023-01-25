import { createSlice } from '@reduxjs/toolkit';
import { Menu, MenuList } from '../lib/types';

const menus: MenuList = {
  게시판: { id: 0, name: '게시판', urlpath: '' },
  시간표: { id: 1, name: '시간표', urlpath: 'timetable' },
  강의실: { id: 2, name: '강의실', urlpath: 'lecture' },
  학점계산기: { id: 3, name: '학점계산기', urlpath: 'calculator' },
  친구: { id: 4, name: '친구', urlpath: 'friend' },
};

type TMenuSlice = {
  menuList: Menu[];
  selectedMenu: Menu | null;
};

const initialState: TMenuSlice = {
  menuList: [
    { id: 0, name: '게시판', urlpath: '' },
    { id: 1, name: '시간표', urlpath: 'timetable' },
    { id: 2, name: '강의실', urlpath: 'lecture' },
    { id: 3, name: '학점계산기', urlpath: 'calculator' },
    { id: 4, name: '친구', urlpath: 'friend' },
  ],
  selectedMenu: null,
};

const menuSlice = createSlice({
  name: 'menuSlice',
  initialState,
  reducers: {
    setSelectedMenu: (state, { payload }) => {
      if (payload) state.selectedMenu = menus[payload];
      else state.selectedMenu = null;
    },
  },
});

export default menuSlice;
export const { setSelectedMenu } = menuSlice.actions;
