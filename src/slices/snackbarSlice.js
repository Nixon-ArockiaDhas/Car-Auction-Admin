import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name:"snackbar",
    initialState:{
        open:false,
        message:"",
        severity:"info"
    },
    reducers:{
        showSnackbar:(state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || "info";
        },
        hideSnackbar:(state, action) => {
            state.open = false;
            state.message = "";
            state.severity = "info";
        }
    }
})

export const {showSnackbar, hideSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;