import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    temp: {},
    error: null,
}

export const getTemperature = createAsyncThunk("weatherToday/getTemperature", async({city, country}) => {
    try {
        const result  = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_KEY_WEATHER}&contentType=json`);
        if(!result.ok) {
            throw new Error("Error when receiving today weather forecast");
        }
        let data = await result.json();
        return data;
    } catch (e) {
        console.error(e);
        throw e;
    }
})

const weatherTodaySlice = createSlice({
    name: "weatherToday",
    initialState,
    reducers: {
        getWeatherToday: (state, action) => {
            state.temp = action.payload;
        },
    }, 
    extraReducers: (builder) => {
           builder
           .addCase(getTemperature.fulfilled, (state,action) => {
            state.temp = action.payload;
            state.error = null;
           })
           .addCase(getTemperature.pending, () => {
            console.log("getTemperature pending");
           })
           .addCase(getTemperature.rejected, (state, action) => {
            console.log("getTemperature rejected");
            state.error = action.error.message;
           })
    },
})

export const { getWeatherToday } = weatherTodaySlice.actions;
export default weatherTodaySlice.reducer;