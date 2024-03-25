import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    temp: {},
}

export const getTemperature = createAsyncThunk("weatherToday/getTemperature", async({city, country}) => {
 const result  = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/today?unitGroup=metric&include=days&key=${process.env.REACT_APP_KEY_WEATHER}&contentType=json&iconSet=icons1`);
 let data = await result.json();
 return data;
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
           })
           .addCase(getTemperature.pending, () => {
            console.log("getTemperature pending");
           })
           .addCase(getTemperature.rejected, () => {
            console.log("getTemperature rejected");
           })
    },
})

export const { getWeatherToday } = weatherTodaySlice.actions;
export default weatherTodaySlice.reducer;