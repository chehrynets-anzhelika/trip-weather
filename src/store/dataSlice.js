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
        saveDataFromDB: (state, action) => {
              state.trips = [...action.payload]
        },
        clearData: (state) => {
            return { ...state, trips: [] }
        },
        saveCityImage: (state, action) => {
            const trip = state.trips.find(trip => trip.city.id === action.payload.id)
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
        },
        clearFilterData: (state) => {
            return { ...state, filteredTrips: [] }
        },
        deleteCard: (state, action) => {
            let newTrips = state.trips.filter(trip => trip.city.id !== action.payload);
            let filteredTrips = state.filteredTrips.filter(trip => trip.city.id !== action.payload);
            return {...state, trips: newTrips, filteredTrips}
        }
    }
});

export const { saveData, saveDataFromDB, clearData, saveCityImage, saveSelectedCard, unSelectedCard, filterData, deleteCard, clearFilterData } = dataSlice.actions;

export default dataSlice.reducer;