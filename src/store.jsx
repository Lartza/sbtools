import { configureStore } from '@reduxjs/toolkit';
import { sponsortimeApi } from './slices/sponsortimeApiSlice';

export default configureStore({
  reducer: {
    [sponsortimeApi.reducerPath]: sponsortimeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sponsortimeApi.middleware),
});
