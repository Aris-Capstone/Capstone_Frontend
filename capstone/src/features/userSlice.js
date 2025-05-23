import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user: {},
    isLoggedIn: false,
    cart: [],
    token: null,
    isAdmin: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.is_admin;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const cartItem = {
                ...action.payload,
                cartItemId: Date.now()
            };
            state.cart.push(cartItem);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.cartItemId !== action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = {};
            state.cart = [];
            state.isLoggedIn = false;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
    },
});

export const { setUser, setIsLoggedIn, setCart, addToCart, removeFromCart, logout, setToken, setIsAdmin } = userSlice.actions;
export const getUserId = (state) => state.user.user?.id;
export const getToken = (state) => state.user.token;
export const getCart = (state) => state.user.cart;
export const getIsLoggedIn = (state) => state.user.isLoggedIn;
export const getUser = (state) => state.user.user;
export const getIsAdmin = (state) => state.user.isAdmin;
export default userSlice.reducer;