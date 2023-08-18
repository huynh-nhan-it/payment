import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalculateState{
    payMethod :   string;
    totalAmount : number;
    tax : number;
    advanceAmount : number;
    totalPayment : number;
}

const initialState: CalculateState = {
    payMethod :   "",
    totalAmount : 0,
    tax : 0,
    advanceAmount : 0,
    totalPayment : 0,
  };

const calSlice = createSlice({
    name: 'form',
    initialState,
    reducers:{
        updatePayMethod: (state, action: PayloadAction<string>) =>{
            state.payMethod = action.payload;
        },
        updateTotalAmount: (state, action: PayloadAction<number>) =>{
            state.totalAmount = action.payload;
        },
        updateTax: (state, action: PayloadAction<number>) =>{
            state.tax = action.payload;
        },
        updateAdvanceAmount: (state, action: PayloadAction<number>) =>{
            state.advanceAmount = action.payload;
        },
        updateTotalPayment: (state, action: PayloadAction<number>) =>{
            state.totalPayment = action.payload;
        },
    }
});

export const {updatePayMethod, 
            updateTotalAmount, 
            updateTax, 
            updateAdvanceAmount, 
            updateTotalPayment, 
            } = calSlice.actions;
            
export default calSlice.reducer;