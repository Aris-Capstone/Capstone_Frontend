import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '../api/storeApi';
import userReducer from '../features/userSlice';

export default configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware),
});


