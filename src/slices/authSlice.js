import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/api";

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await loginApi(credentials);
        const { token, role, name, firstName, lastName, email } = response;
        const fullName = `${firstName} ${lastName}`;
        const loginTime = new Date().getTime();

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userFullName', fullName); 
        localStorage.setItem('loginTime', loginTime);
        localStorage.setItem('userEmail', email);

        return { token, role, name, fullName };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userFullName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('loginTime');

        return true;
    } catch (error) {
        return rejectWithValue('Logout failed');
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.userRole = action.payload.role;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                state.userRole = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default authSlice.reducer;