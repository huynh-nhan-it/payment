import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store/store';

export type DepartmentNameState = {
  departmentName: string
}
const initialState : DepartmentNameState = {
    departmentName: ''
}

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartmentNameAction: (state : DepartmentNameState, action : PayloadAction<string>) => {
        state.departmentName = action.payload;
    }
  }
});

export const {setDepartmentNameAction} = departmentSlice.actions

export default departmentSlice.reducer

export const setDepartmentName = (departmentName: string) => {
    return (dispatch: AppDispatch) => {
        dispatch(setDepartmentNameAction(departmentName));
    }
}