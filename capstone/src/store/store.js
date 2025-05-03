import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '../api/storeApi';
import { authApi } from '../api/authApi';

export default configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware, authApi.middleware),
});

