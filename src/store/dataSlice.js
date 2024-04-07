import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        trips: [],
        filteredTrips: []
    },
    reducers: {
        saveData: (state, action) => {
            state.trips.push(action.payload);
        },
        saveCityImage: (state, action) => {
            const trip = state.trips.find(trip => trip.city.city === action.payload.city);
            if (trip) {
                trip.cityImage = action.payload.cityImage;
            }
        },
        saveSelectedCard: (state, action) => {
            const current = state.trips.find(trip => trip.city.id.toString() === action.payload);
            if (current) {
                current.selected = true;
            }

            const testcurrent = state.filteredTrips.find(trip => trip.city.id.toString() === action.payload);
            if(testcurrent) {
                testcurrent.selected = true;
            }
        },
        unSelectedCard: (state) => {
            let foundFullList = state.trips.find(trip => trip.selected === true);
            if (foundFullList) {
                foundFullList.selected = false;
            }

            let foundFilteredList = state.filteredTrips.find(trip => trip.selected === true);
            if (foundFilteredList) {
                foundFilteredList.selected = false;
            }
        },
        filterData: (state, action) => {
            if (action.payload) {
                let filteredTrips = state.trips.filter(trip => trip.city.city.toLowerCase().includes(action.payload.toLowerCase()));
                return { ...state, filteredTrips: filteredTrips }
            } else {
                return { ...state, filteredTrips: [...state.trips] }
            }
        }
    }
});

export const { saveData, saveCityImage, saveSelectedCard, unSelectedCard, filterData } = dataSlice.actions;

export default dataSlice.reducer;