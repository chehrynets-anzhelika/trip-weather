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
        },
        saveSelectedCard: (state, action) => {
           const current = state.trips.find(trip => trip.city.id.toString() === action.payload);
           if(current) {
            current.selected = true;
        }
        },
        unSelectedCard: (state) => {
            let found = state.trips.find(trip => trip.selected === true);
            if(found){
                found.selected = false;
            }
        }
    }
});

export const { saveData, saveCityImage, saveSelectedCard, unSelectedCard } = dataSlice.actions;

export default dataSlice.reducer;