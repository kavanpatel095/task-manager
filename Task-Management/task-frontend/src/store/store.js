import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        search: searchReducer,
    },
});
