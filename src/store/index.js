import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import dataReducer from "./dataSlice";
import tripReducer from "./tripSlice";
import weatherTodayReducer from "./weatherTodaySlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        data: dataReducer,
        currentTrip: tripReducer,
        weatherToday: weatherTodayReducer,
    },
});

export default store;