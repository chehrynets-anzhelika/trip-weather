import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: ""
}

const searchSlice = createSlice({
    name: "searchInput",
    initialState,
    reducers: {
        saveSearchValue: (state, action) => {
            return {...state, searchValue: action.payload};
        },
    }
})

export const { saveSearchValue } = searchSlice.actions;

export default searchSlice.reducer;


