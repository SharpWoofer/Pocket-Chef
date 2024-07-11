import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'https://pocket-chef-backend-5q8gfx9dg-pocket-chefs-projects.vercel.app';

export const commonApi = createApi({
    reducerPath: "commonApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/common`,
    }),
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (payload) => ({
                url: `/upload`,
                method: 'POST',
                body: payload,
            })
        }),
    }),
});

export const {useUploadFileMutation} = commonApi;