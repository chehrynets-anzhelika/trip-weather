import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        trips:[]
    },
    reducers: {
        saveData: (state, action) => {
            state.trips.push(action.payload);
        }
    }
});

export const { saveData } = dataSlice.actions;

export default dataSlice.reducer;