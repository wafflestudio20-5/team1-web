import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import boardSlice from './boardSlice';
import menuSlice from './menuSlice';
import sessionSlice from './sessionSlice';
const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    menu: menuSlice.reducer,
    board: boardSlice.reducer,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type Appdispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<Appdispatch>();

export default store;
