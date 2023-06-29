import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import movieService from './movieServices';

const initialState = {
    movie: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

export const resetState = createAction('Reset_all');

export const movieSlice = createSlice({
    name: 'moive',
    initialState: initialState,
    reducers: {},
    extraReducers: (buildeer) => {
        buildeer.addCase(resetState, () => initialState);
    },
});

export default movieSlice.reducer;
