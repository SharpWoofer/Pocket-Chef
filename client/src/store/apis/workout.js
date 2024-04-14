import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5001';

export const workoutApi = createApi({
    reducerPath: "workoutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/workout`
    }),
    endpoints: (builder) => ({
        searchWorkout: builder.query({
            query: ({ name, type, muscle, difficulty }) => ({
                url: '/search',
                params: {
                    name,
                    type,
                    muscle,
                    difficulty
                },
            }),
        }),
    }),
});

export const { useSearchWorkoutQuery } = workoutApi;
