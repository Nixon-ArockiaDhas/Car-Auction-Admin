import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPostalArea } from "../api/api";

export const fetchPostalData = createAsyncThunk('postal/fetchPostalData', async(pincode)=>{
    const response = await fetchPostalArea(pincode);
    console.log("postoffice--->", response);
    return response[0]?.PostOffice || [];
});

const postalSlice = createSlice({
    name: 'postal',
    initialState: {
      postOffices: [],
      loading:false,
      error: null,
    },
    reducers: {
      resetPostOffices: (state) => {
        state.postOffices = []; 
    },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchPostalData.pending, (state, action) => {
          state.loading = true;
          state.error = action.payload;
      })
      .addCase(fetchPostalData.fulfilled, (state, action) => {
          state.loading = false; 
          state.postOffices = action.payload; 
      })
      .addCase(fetchPostalData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message; 
      });
    },
  });
  
  export const { resetPostOffices } = postalSlice.actions;
  export default postalSlice.reducer;