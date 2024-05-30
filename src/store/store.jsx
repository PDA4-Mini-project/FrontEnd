import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import gardenSlice from './gardenSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
    garden: gardenSlice,
    user: userSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
