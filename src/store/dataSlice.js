import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        city: "",
        startDate: "",
        endDate: "",
    },
    reducers: {
        saveData: (state, action) => {
            state.city = action.payload.city;
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
        }
    }
});

export const { saveData } = dataSlice.actions;

export default dataSlice.reducer;