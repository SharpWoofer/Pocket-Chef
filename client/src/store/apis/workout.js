import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5001';

export const workoutApi = createApi({
    reducerPath: "workoutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/searchWorkout/searchWorkout`
    }),
    endpoints: (builder) => ({
        searchWorkout: builder.query({
            query: ({ type, muscle, difficulty }) => ``,
        }),
    }),
});

export const { useSearchWorkoutQuery } = workoutApi;
