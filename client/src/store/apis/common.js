import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5001';

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