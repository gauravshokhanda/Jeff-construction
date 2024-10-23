import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://3.111.47.151:5000/api/auth/login', formData);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);


export const register = createAsyncThunk(
    'auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://3.111.47.151:5000/api/auth/register', formData);
            return response.data; 
        } catch (error) {
            
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        
        builder
            .addCase(login.pending, (state) => {
                state.error = null; 
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload; 
                state.isAuthenticated = false;
            })
            // Registration extra reducers
            .addCase(register.pending, (state) => {
                state.error = null; 
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload; 
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload; 
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
