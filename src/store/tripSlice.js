import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: null,
}
const tripSlice = createSlice({
    name: "currentTrip",
    initialState,
    reducers: {
        selectTrip: (state, action) => {
           state.current = action.payload;
        },
        deleteSelectTrip: (state) => {
            state.current = null;
        }
    }
});

export const { selectTrip, deleteSelectTrip } = tripSlice.actions;
export default tripSlice.reducer;