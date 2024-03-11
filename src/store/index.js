import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import dataReducer from "./dataSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        data: dataReducer,
    },
});

export default store;