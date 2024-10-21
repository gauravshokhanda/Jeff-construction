// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "./Slices/authSlice"; 
import areaReducer from "./Slices/areaSlice";

const persistConfig = {
    key: 'auth',
    storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
        area:areaReducer
    },
});

export const persistor = persistStore(store);