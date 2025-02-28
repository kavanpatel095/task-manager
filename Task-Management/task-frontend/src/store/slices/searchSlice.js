import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        filter: 'all',
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setSearchQuery, setFilter } = searchSlice.actions;
export default searchSlice.reducer;
