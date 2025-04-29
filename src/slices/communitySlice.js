import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { communityAPI, deleteCommunityAPI, getCommunity } from "../api/api";

export const fetchCommunity = createAsyncThunk('community/fetchCommunity', async ()=>{
    let allCommunity =[];
    let resultsPerPage = 10;
    do{
        const response = await getCommunity();
        allCommunity = [...allCommunity, ...response];
    }while(allCommunity.length === resultsPerPage);
    return allCommunity;
});

export const editCommunity = createAsyncThunk('community/editCommunity', async({seller_name, state_names})=>{
    const data = await communityAPI(seller_name, state_names);
    return data;
})

export const deleteCommunity = createAsyncThunk('community/deleteCommunity', async(id) => {
    await deleteCommunityAPI(id);
    return id;
})

const communitySlice =  createSlice({
    name:'community',
    initialState:{
        community:[],
        loading:false,
        error:null,
        selectedCommunity:null,
        stateList:null
    },reducers:{
        setSelectedCommunity(state, action){
            state.selectedCommunity = action.payload;
        },
        setStateList(state, action){
            state.stateList = action.payload;
        }
    },
    
    extraReducers:(builder)=>{
        builder.addCase(fetchCommunity.pending, (state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCommunity.fulfilled, (state, action)=>{
            state.loading = true;
            state.community = action.payload;
        });
        builder.addCase(fetchCommunity.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(editCommunity.fulfilled,(state, action)=>{
            state.community.unshift(action.payload);
        });
        builder.addCase(editCommunity.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteCommunity.fulfilled, (state,action)=>{
            state.community = state.community.filter((community)=>community.id !== action.payload);
        });
    }
});

export default communitySlice.reducer;
export const {setSelectedCommunity, setStateList} = communitySlice.actions;