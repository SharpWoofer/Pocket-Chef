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
    },
});

export const { setCredentials } = authSlice.actions
export default authSlice.reducer;