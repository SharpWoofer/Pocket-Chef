import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { user, token },
            },
        ) => {
            state.user = user
            state.token = token
        },
        setLocalUserInfo: (state, { payload: { user } }) => {
            state.user = user
        },
        clearUserInfo: (state) => {
            delete state.user
            delete state.token
        },
    },
});

export const { setCredentials, setLocalUserInfo, clearUserInfo } = authSlice.actions
export default authSlice.reducer;