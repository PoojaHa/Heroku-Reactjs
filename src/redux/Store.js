// src/redux/Store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "../redux/Auth/authSlice";
import Taskapi from "../redux/Task/Task";
import authApi from "../redux/Auth/authApi"
import problemreducer  from "../redux/Auth/problemSlice";
// Combine reducers
const appReducer = combineReducers({
    auth: authReducer,
    [authApi.reducerPath] :authApi.reducer,
    [Taskapi.reducerPath]: Taskapi.reducer,
    problemreducer
});

// Root reducer with reset logic
const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        storage.removeItem('persist:krido@vendor');
        state = undefined;
    }
    return appReducer(state, action);
};

// Persist configuration
const persistConfig = {
    key: 'krido@vendor',
    version: 1,
    storage,
    whitelist: ['auth']
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware,Taskapi.middleware),
});

const persistedStore = persistStore(store);
export {store, persistedStore};