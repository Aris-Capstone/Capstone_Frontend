import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '../api/storeApi';
import { authApi } from '../api/authApi';
import userReducer from '../features/userSlice';

export default configureStore({
    reducer: {
        [storeApi.reducerPath]: storeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(storeApi.middleware, authApi.middleware),
});


