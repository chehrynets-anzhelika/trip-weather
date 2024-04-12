import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import dataReducer from "./dataSlice";
import tripReducer from "./tripSlice";
import weatherTodayReducer from "./weatherTodaySlice";
import searchReducer from "./searchSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        data: dataReducer,
        currentTrip: tripReducer,
        weatherToday: weatherTodayReducer,
        search: searchReducer,
    },
});

export default store;