import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortValue: "",
}

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        saveSortValue: (state, action) => {
            return {...state, sortValue: action.payload};
        },
    }
})

export const { saveSortValue } = sortSlice.actions;

export default sortSlice.reducer;