import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://pocket-chef-backend-5q8gfx9dg-pocket-chefs-projects.vercel.app';

export const gymApi = createApi({
    reducerPath: "gymApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/gyms`
    }),
    endpoints: (builder) => ({
        searchGym: builder.mutation({
            query: (payload) => ({
                url: `/search`,
                method: 'POST',
                body: payload,
            })
        }),
    }),
});

export const {useSearchGymMutation} = gymApi;