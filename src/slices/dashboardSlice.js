import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserCount, fetchSaleCalendarCount } from "../api/api";

export const fetchUserCountData =  createAsyncThunk('dashboard/fetchUserCountData', async()=>{
    const response = await fetchUserCount();
    return response;
});

export const fetchSaleCalendarCountData = createAsyncThunk('dashboard/fetchSaleCalendarCountData', async()=>{
    const response = await fetchSaleCalendarCount();
    return response;
})

const dashboardSlice = createSlice({
    name:'dashboard',
    initialState:{
        userCount:[],
        saleCalendarCount:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder) =>{
    builder.addCase(fetchUserCountData.pending,(state)=>{
        state.loading = true;
        });
    builder.addCase(fetchUserCountData.fulfilled,(state, action)=>{
        state.loading = false;
        state.userCount = action.payload;
    });
    builder.addCase(fetchUserCountData.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.error.message;
    });
    builder.addCase(fetchSaleCalendarCountData.pending,(state)=>{
        state.loading = true;
        });
    builder.addCase(fetchSaleCalendarCountData.fulfilled,(state, action)=>{
        state.loading = false;
        state.saleCalendarCount = action.payload;
    });
    builder.addCase(fetchSaleCalendarCountData.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.error.message;
    });
    }
});

export default dashboardSlice.reducer;