import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/api/users",
                method: "POST",
                body,
            }),
        }),
        findUserWithToken: builder.query({
            query: (token) => ({
                url: "/findUserWithToken",
                method: "GET",
                headers: { Authorization: `${token}` },
            }),
        }),
    }),

});

export const {
    useRegisterMutation,
    useFindUserWithTokenQuery,
} = authApi;