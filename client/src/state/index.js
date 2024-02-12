import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    loading: false,
    error: null,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setMode, setUser, setToken, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
