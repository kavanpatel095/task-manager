import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';
import { toast } from 'react-toastify';


const initialState = {
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, thunkAPI) => {
        try {
            const data = await authService.login(credentials);
            localStorage.setItem('token', data.token);
            return data.token;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (credentials, thunkAPI) => {
        try {
            const data = await authService.signup(credentials);
            localStorage.setItem('token', data.token);
            return data.token;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                toast.success('Login successful!');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                toast.success('Signup successful!');
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
