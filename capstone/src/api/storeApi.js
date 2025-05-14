import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeApi = createApi({
    reducerPath: "storeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user?.token;
            if (token && token !== "") {
                headers.set("Authorization", token);
            }
            return headers;
        },
    }),
    tagTypes: ["Users", "Products", "Cart"],
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: (body) => ({
                url: "/api/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        authenticate: builder.mutation({
            query: (credentials) => ({
                url: "/api/login",
                method: "POST",
                body: {
                    username: credentials.username,
                    password: credentials.password,
                    name: credentials.name,
                    mailing_address: credentials.mailing_address,
                    is_admin: credentials.is_admin,
                },
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                }
            }),
            invalidatesTags: ["Users"],
        }),
        createProduct: builder.mutation({
            query: (body) => ({
                url: "/api/products",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        createUserCart: builder.mutation({
            query: (body) => ({
                url: "/api/user_cart",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        fetchProduct: builder.query({
            query: (product_id) => `/api/products/${product_id}`,
            providesTags: ["Products"],
        }),
        fetchProducts: builder.query({
            query: () => "/api/products",
            providesTags: ["Products"],
        }),
        fetchUserCart: builder.query({
            query: (user_id) => `/api/user_cart/${user_id}`,
            providesTags: ["Cart"],
        }),
        fetchUser: builder.query({
            query: (user_id) => `/api/users/${user_id}`,
            providesTags: ["Users"],
        }),
        fetchUsers: builder.query({
            query: () => "/api/admin_users",
            providesTags: ["Users"],
        }),
        updateUserCart: builder.mutation({
            query: (user_id, product_id, body) => ({
                url: `/api/user_cart/${user_id}/${product_id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteUserCart: builder.mutation({
            query: (user_id, product_id) => ({
                url: `/api/user_cart/${user_id}/${product_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/products/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "/api/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),
        findUserWithToken: builder.query({
            query: (token) => ({
                url: "/api/users/findUserWithToken",
                method: "GET",
                headers: { Authorization: `${token}` },
            }),
        }),
    }),
});

export const {
    useCreateUserMutation,
    useCreateProductMutation,
    useCreateUserCartMutation,
    useFetchProductQuery,
    useFetchProductsQuery,
    useFetchUserCartQuery,
    useFetchUserQuery,
    useFetchUsersQuery,
    useUpdateUserCartMutation,
    useDeleteUserCartMutation,
    useDeleteProductMutation,
    useAuthenticateMutation,
    useRegisterMutation,
    useFindUserWithTokenQuery,
} = storeApi;   