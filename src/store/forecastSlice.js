import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentForecast: {},
}

export const getForecast = createAsyncThunk("forecast/getForecast", async({city, country, dateStart, dateEnd}) => {
    const result  = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/${dateStart}/${dateEnd}?unitGroup=metric&include=days&key=${process.env.REACT_APP_KEY_WEATHER}&contentType=json`);
    let data = await result.json();
    return data;
   })

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    reducers: {
        getCurrentForecast: (state, action) => {
            state.currentForecast = action.payload;
        },
        clearCurrentForecast: (state) => {
            state.currentForecast = {};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getForecast.fulfilled, (state,action) => {
         state.currentForecast = action.payload;
        })
        .addCase(getForecast.pending, () => {
         console.log("getForecast pending");
        })
        .addCase(getForecast.rejected, () => {
         console.log("getForecast rejected");
        })
 },
})

export const { getCurrentForecast, clearCurrentForecast } = forecastSlice.actions;
export default forecastSlice.reducer;