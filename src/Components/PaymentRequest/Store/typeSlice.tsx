import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypeState{
    typeState: string
}

const initialState: TypeState = {
    typeState :   "create-request",
    
  };

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers:{
        updateTypeState: (state, action: PayloadAction<string>) =>{
            state.typeState = "create-request";
        },
        
    }
});

export const {updateTypeState 
            } = typeSlice.actions;
export default typeSlice.reducer