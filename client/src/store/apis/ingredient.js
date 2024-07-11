import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://pocket-chef-sigma.vercel.app';

export const ingredientApi = createApi({
    reducerPath: "ingredientApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/ingredients`
    }),
    endpoints: (builder) => ({
        searchIngredient: builder.mutation({
            query: (payload) => ({
                url: `/`,
                method: 'POST',
                body: payload
            }),
        }),
        getIngredientById: builder.mutation({
            query: (payload) => ({
                url: `/calories`,
                method: 'POST',
                body: payload
            }),
        }),
        getCalCount: builder.mutation({
            query: (payload) => ({
                url: `/getcal`,
                method: 'POST',
                body: payload
            }),
        }),
        createCalCount: builder.mutation({
            query: (payload) => ({
                url: `/createcal`,
                method: 'POST',
                body: payload
            }),
        }),
        updateCalCount: builder.mutation({
            query: (payload) => ({
                url: `/updatecal`,
                method: 'POST',
                body: payload
            }),
        }),
    }),
});

export const {
    useSearchIngredientMutation,
    useGetIngredientByIdMutation,
    useGetCalCountMutation,
    useCreateCalCountMutation,
    useUpdateCalCountMutation
} = ingredientApi;
