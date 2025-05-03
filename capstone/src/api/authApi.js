import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "postgres://localhost/backend_product_store_db/authentication"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
    }),
    findUserWithToken: builder.query({
        query: (token) => ({
            url: "/findUserWithToken",
            method: "GET",
            headers: { Authorization: `${token}` },
        }),
    }),
});

export const {
    useRegisterMutation,
    useFindUserWithTokenQuery,
} = authApi;