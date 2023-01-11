import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import sessionSlice from './sessionSlice';
const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
