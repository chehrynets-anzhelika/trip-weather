import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,
    id: null,
}

const googleAuthSlice = createSlice({
    name: "googleAuth",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.userName = action.payload.displayName;
            state.id = action.payload.accessToken;
        },
        deleteUser: (state) => {
            state.userName = null;
            state.id = null;
        }
    }

})

export const { saveUser, deleteUser } = googleAuthSlice.actions;
export default googleAuthSlice.reducer;