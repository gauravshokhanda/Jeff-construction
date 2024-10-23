import { createSlice } from '@reduxjs/toolkit';
// 
const initialState = {
    CalculateFormData: {},
};


const CalculationSlice=createSlice({
    name:'form',
    initialState,
    reducers:{
        setCalculateData:(state,action)=>{
            state.CalculateFormData = action.payload;
        },
        resetData: (state)=>{
            state.CalculateFormData = initialState.CalculateFormData;
        },
    }
})

export const { setCalculateData, resetData } = CalculationSlice.actions;
export default CalculationSlice.reducer;