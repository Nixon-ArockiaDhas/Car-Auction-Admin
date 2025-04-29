import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../api/api";
import { createUserAPI, updateUserAPI, deleteUserAPI, changePasswordAPI } from "../api/api";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    let allUsers = [];
    let resultsPerPage = 10;
    do {
        const response = await getUsers();
        allUsers = [...allUsers, ...response];
    } while (allUsers.length === resultsPerPage);
    return (allUsers);
});

export const createUser = createAsyncThunk('users/createUser', async (userDetails) => {
    const data = createUserAPI(userDetails);
    return data
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ userObjectId, userDetails }) => {
    const data = await updateUserAPI(userObjectId, userDetails);
    return { userObjectId, ...data };
});


export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await deleteUserAPI(id);
    return id
});

export const changePassowrd = createAsyncThunk('users/changePassword', async ({ id, password }) => {
    const data = await changePasswordAPI(id, password);
    return data;
})

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        selectedUser: null,
    }, reducers: {
        setSelectedUser(state, action) {
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.users.unshift(action.payload);
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const index = state.users.findIndex((u) => u._id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload };
            }
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload.id);
        });
        builder.addCase(changePassowrd.fulfilled, (state, action) => {
            const index = state.users.findIndex((u) => u._id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload };
            }
        });
    }

})

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;