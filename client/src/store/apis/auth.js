import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5001';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/auth`,
        // headers: 
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: `/login`,
                method: 'POST',
                body: payload,
            })
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: `/register`,
                method: 'POST',
                body: payload
            })
        }),
        addUserWeight: builder.mutation({
            query: (payload) => ({
                url: `/addUserWeight`,
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + payload.token
                }),
                body: payload
            })
        }),
        getUserWeightList: builder.mutation({
            query: (payload) => ({
                url: `/getUserWeightList`,
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer ' + payload.token
                })
            })
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useAddUserWeightMutation, useGetUserWeightListMutation } = authApi;
