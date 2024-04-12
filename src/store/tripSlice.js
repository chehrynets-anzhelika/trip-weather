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
    }
});

export const { selectTrip } = tripSlice.actions;
export default tripSlice.reducer;