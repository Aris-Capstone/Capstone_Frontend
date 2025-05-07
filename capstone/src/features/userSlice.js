import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    token: "",
    user: {},
    isLoggedIn: false,
    cart: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
        },
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = "";
            state.user = {};
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout, addToCart, removeFromCart, login } = userSlice.actions;
export const getUserId = (state) => state.user.user.id;
export const getToken = (state) => state.user.token;
export const getCart = (state) => state.user.cart;
export default userSlice.reducer;