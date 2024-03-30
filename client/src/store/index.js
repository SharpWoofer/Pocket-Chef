import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import { authApi, recipeApi, ingredientApi } from "./apis";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ['auth', 'ingredients']
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [ingredientApi.reducerPath]: ingredientApi.reducer, // Add ingredientApi reducer
    }));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(authApi.middleware)
            .concat(recipeApi.middleware)
            .concat(ingredientApi.middleware) // Add ingredientApi middleware
});

export const persistor = persistStore(store);
