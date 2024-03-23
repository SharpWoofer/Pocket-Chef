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
import { recipeApi } from "./apis/recipe";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authReducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
    }));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(recipeApi.middleware),
});

export const persistor = persistStore(store);
