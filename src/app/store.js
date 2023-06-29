import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import categoryReducer from '../services/category/categorySlice';
import movieReducer from '../services/movie/moiveSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        movie: movieReducer,
    },
});
