import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    area: 0,
};

const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {
        setArea(state, action) {
            state.area = action.payload; // Update area with the payload value
        },
        clearArea(state) {
            state.area = 0; // Reset area to 0
        },
    },
});

export const { setArea, clearArea } = areaSlice.actions;

export default areaSlice.reducer;
