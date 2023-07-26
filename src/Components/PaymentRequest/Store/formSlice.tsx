import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState{
    purpose :   string;
    department : string;
    paymentFor : string;
    supplier : string;
    currency : string;
    exchangeRate : number;
    poPrNumber : number;
}

const initialState: FormState = {
    purpose :   "",
    department : "",
    paymentFor : "",
    supplier : "",
    currency : "",
    exchangeRate : 0,
    poPrNumber : 0,
  };

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers:{
        updatePurpose: (state, action: PayloadAction<string>) =>{
            state.purpose = action.payload;
        },
        updateDepartment: (state, action: PayloadAction<string>) =>{
            state.department = action.payload;
        },
        updatePaymentFor: (state, action: PayloadAction<string>) =>{
            state.paymentFor = action.payload;
        },
        updateSupplier: (state, action: PayloadAction<string>) =>{
            state.supplier = action.payload;
        },
        updateCurrency: (state, action: PayloadAction<string>) =>{
            state.currency = action.payload;
        },
        updateExchangeRate: (state, action: PayloadAction<number>) =>{
            state.exchangeRate = action.payload;
        },
        updatePoPrNumber: (state, action: PayloadAction<number>) =>{
            state.poPrNumber = action.payload;
        },
    }
});

export const {updatePurpose, 
            updateDepartment, 
            updatePaymentFor, 
            updateSupplier, 
            updateCurrency, 
            updateExchangeRate, 
            updatePoPrNumber} = formSlice.actions;
export default formSlice.reducer;