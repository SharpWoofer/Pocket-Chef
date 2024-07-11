import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://pocket-chef-backend-5q8gfx9dg-pocket-chefs-projects.vercel.app';

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
            query: ({
                        query,
                        number,
                        cuisine,
                        minCalories,
                        maxCalories
                    }) => `/search?q=${query}&number=${number}&cuisine=${cuisine}&minCalories=${minCalories}&maxCalories=${maxCalories}`,
        }),
        addFavoriteRecipe: builder.mutation({
            query: ({username, recipeId}) => ({
                url: `/favorites`,
                method: 'POST',
                body: {username, recipeId},
            }),
        }),
        getFavoriteRecipes: builder.query({
            query: (username) => `/favorites/${username}`,
        }),
        removeFavoriteRecipe: builder.mutation({
            query: ({username, recipeId}) => ({
                url: `/favorites/${recipeId}`,
                method: 'DELETE',
                body: {username, recipeId},
            }),
        }),

    }),
});

export const {
    useGetRecipeByIdQuery,
    useSearchRecipesQuery,
    useAddFavoriteRecipeMutation,
    useGetFavoriteRecipesQuery,
    useRemoveFavoriteRecipeMutation
} = recipeApi;
