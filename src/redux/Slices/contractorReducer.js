// src/redux/contractorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contractors: [],
};

const contractorSlice = createSlice({
    name: 'contractor', // Slice name
    initialState,
    reducers: {
        setContractors: (state, action) => {
            state.contractors = action.payload;
        },
    },
});

export const { setContractors } = contractorSlice.actions; // Export the action creator

export default contractorSlice.reducer; // Export the reducer
