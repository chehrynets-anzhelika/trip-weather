import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    currentForecast: {},
    error: null,
}

export const getForecast = createAsyncThunk("forecast/getForecast", async({city, country, dateStart, dateEnd}, {rejectWithValue}) => {
    try {
        const result  = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/${dateStart}/${dateEnd}?unitGroup=metric&include=days&key=${process.env.REACT_APP_KEY_WEATHER}&contentType=json`);
        if(!result.ok) {
            throw new Error("Error when receiving weather forecast");
        }
        let data = await result.json();
        return data;
    } catch (e) {
        return rejectWithValue(e.message);
    }
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
         state.error = null;
        })
        .addCase(getForecast.pending, () => {
         
        })
        .addCase(getForecast.rejected, (state, action) => {
         state.error = action.error.message;
        })
 },
})

export const { getCurrentForecast, clearCurrentForecast } = forecastSlice.actions;
export default forecastSlice.reducer;