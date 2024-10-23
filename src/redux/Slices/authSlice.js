import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        login(state, action) {
            const { email, password } = action.payload;
            if (state.user && state.user.email === email && state.user.password === password) {
                state.isAuthenticated = true;
                state.error = null;
            } else {
                state.error = 'Invalid email or password';
            }
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
