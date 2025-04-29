import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deletSaleCalenderAPI, getSaleCalendar, getStateList, createSaleCalenderAPI } from "../api/api";

export const fetchSaleCalendar = createAsyncThunk('saleCalendar/fetchSaleCalendar', async () => {
    let allSaleCalendar = [];
    let resultsPerPage = 10;
    let page = 1;
    do {
        const response = await getSaleCalendar();
        allSaleCalendar = [...allSaleCalendar, ...response];
        console.log("Form fetchSaleCalendar-->", response);
        page++;
    } while (allSaleCalendar.length === resultsPerPage);
    return allSaleCalendar;
});

export const fetchStatesList = createAsyncThunk('saleCalendar/fetchStates', async () => {
    let allStates = [];
    const response = await getStateList();
    allStates = [...allStates, ...response];
    return allStates;
});

export const deleteSaleCalendar = createAsyncThunk('saleCalendar/deleteSaleCalendar', async(id) =>{
    const data = await deletSaleCalenderAPI(id);
    return data;
});

export const createSaleCalendar = createAsyncThunk('saleCalendar/createSaleCalendar', async (saleCalendarData) => {
    const data = await createSaleCalenderAPI(saleCalendarData);
    return data;
});

const saleCalendarSlice = createSlice({
    name: "saleCalendar",
    initialState: {
        saleCalendar: [],
        stateList: [],
        saleCalendarLoading: false,
        stateListLoading: false,
        error: null,
    }, extraReducers: (builder) => {
        builder.addCase(fetchSaleCalendar.pending, (state) => {
            state.saleCalendarLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSaleCalendar.fulfilled, (state, action) => {
            state.saleCalendarLoading = false;
            state.saleCalendar = action.payload;
        });
        builder.addCase(fetchSaleCalendar.rejected, (state, action) => {
            state.saleCalendarLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchStatesList.pending, (state) => {
            state.stateListLoading = true;
            state.error = null;
        });
        builder.addCase(fetchStatesList.fulfilled, (state, action) => {
            state.stateListLoading = false;
            state.stateList = action.payload;
        });
        builder.addCase(fetchStatesList.rejected, (state, action) => {
            state.stateListLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteSaleCalendar.fulfilled, (state, action) => {
            state.saleCalendar = state.saleCalendar.filter((saleCalendar)=> saleCalendar._id !== action.payload.id);
        });

        builder.addCase(createSaleCalendar.fulfilled, (state,action) =>{
            state.saleCalendar.unshift(action.payload);
        });
    }
});

export default saleCalendarSlice.reducer;