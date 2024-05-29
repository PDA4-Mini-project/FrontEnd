import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import gardenSlice from './gardenSlice';

export const rootReducer = combineReducers({
    garden: gardenSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
