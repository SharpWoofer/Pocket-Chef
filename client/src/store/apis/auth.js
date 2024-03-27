import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/auth`
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: `/login`,
                method: 'POST',
                body: { email, password },
            })
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: `/register`,
                method: 'POST',
                body: payload,
            }),
            
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
