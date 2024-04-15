import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalReducer from "./modalSlice";
import dataReducer from "./dataSlice";
import tripReducer from "./tripSlice";
import weatherTodayReducer from "./weatherTodaySlice";
import searchReducer from "./searchSlice";
import forecastReducer from "./forecastSlice";

const rootReducer = combineReducers({
    modal: modalReducer,
    data: dataReducer,
    currentTrip: tripReducer,
    weatherToday: weatherTodayReducer,
    search: searchReducer,
    forecast: forecastReducer,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;