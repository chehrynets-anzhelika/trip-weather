import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        trips:[]
    },
    reducers: {
        saveData: (state, action) => {
            state.trips.push(action.payload);
        },
        saveCityImage: (state, action) => {
            const trip = state.trips.find(trip => trip.city.city === action.payload.city);
            if(trip) {
                trip.cityImage = action.payload.cityImage;
            }
        }
    }
});

export const { saveData, saveCityImage } = dataSlice.actions;

export default dataSlice.reducer;