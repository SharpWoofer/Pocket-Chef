import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000';

export const recipeApi = createApi({
    reducerPath: "recipeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/recipes`
    }),
    endpoints: (builder) => ({
        getRecipeById: builder.query({
            query: (id) => `/${id}`,
        }),
        searchRecipes: builder.query({
            query: (q) => `/search?q=${q}`,
        }),
    }),
});

export const { useGetRecipeByIdQuery, useSearchRecipesQuery } = recipeApi;