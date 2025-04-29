import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSidebarItemsApi } from '../api/api';
import { logoutUser } from './authSlice';
import { showSnackbar } from './snackbarSlice';

export const fetchSidebarItems = createAsyncThunk('sidebar/fetchSidebarItems', async (token, { rejectWithValue, dispatch }) => {
    try {
        const sidebarItems = await fetchSidebarItemsApi(token);
        return sidebarItems;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch sidebar items';
        if (errorMessage === 'Invalid token') {
            dispatch(logoutUser());
            dispatch(showSnackbar({ message: 'Session expired. Please login again.', severity: 'warning' }));
        }
        return rejectWithValue(errorMessage);
    }
});

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
      items: [],
      loading: false,
      error: null,
      isFetched: false, 
    },
    reducers: {
      resetSidebar:(state)=>{
        state.items = [];
        state.isFetched = false;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSidebarItems.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSidebarItems.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
          state.isFetched = true; 
        })
        .addCase(fetchSidebarItems.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export const { resetSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
