import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://pocket-chef-backend-5q8gfx9dg-pocket-chefs-projects.vercel.app';

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
        //set user info
        setUserInfo: builder.mutation({
            query: (payload) => ({
                url: `/setUserInfo`,
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + payload.token
                }),
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
//updated export

export const {
    useLoginMutation,
    useRegisterMutation,
    useAddUserWeightMutation,
    useGetUserWeightListMutation,
    useSetUserInfoMutation
} = authApi;
