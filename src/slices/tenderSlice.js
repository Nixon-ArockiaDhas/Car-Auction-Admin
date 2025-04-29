import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTenders } from "../api/api";

export const fetchTenders = createAsyncThunk('tenders/fetchTenders', async () => {
    let allTenders = [];
    let resultsPerPage = 10;
    let page = 1;
    do{
        const response = await getTenders();
        allTenders = [...allTenders,...response];
        page++;
    }while(allTenders.length === resultsPerPage);
    return allTenders;
});


const tenderSlice = createSlice({
    name: 'tenders',
    initialState: {
        tenders: [],
        loading: false,
        error: null,
        selectedTender:null,
        selectedCar:null
    },reducers:{
        setSelectedTender(state, action){
            state.selectedTender = action.payload;
        },
        setSelectedCar(state,action){
            state.selectedCar = action.payload;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(fetchTenders.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTenders.fulfilled, (state, action) => {
            state.loading = false;
            state.tenders = action.payload;
        });
        builder.addCase(fetchTenders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }

});
export const {setSelectedTender, setSelectedCar} = tenderSlice.actions;
export default tenderSlice.reducer;