import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from 'axios';
import { AppDispatch } from '../../Request/component/store/store';

export type FormValues = {
    purpose: string,
    department: string,
    paymentFor: string,
    supplier: string,
    currency: string,
    exchangeRate: string,
    poPrNumber: number
}
export type SubmitFormState = {
    supplierList: string[];
    departmentList: string[];
    currencyList: string[];
    departmentBearList: string[];
    values: FormValues;
}
const initialState: SubmitFormState = {
    supplierList: [],
    departmentList: [],
    currencyList: [],
    departmentBearList: [],
    values: {
        purpose: '',
        department: 'OPUS Company',
        paymentFor: '',
        supplier: '1041171-Công Ty TNHH Opus Solution',
        currency: 'VND',
        exchangeRate: '',
        poPrNumber: 0
    },

}

const submitFormReducer = createSlice({
    name: 'submitForm',
    initialState,
    reducers: {
        getSuppliersFromApiAction: (state: SubmitFormState, action: PayloadAction<string[]>) => {
            state.supplierList = action.payload;
        },
        getDepartmentsFromApiAction: (state: SubmitFormState, action: PayloadAction<string[]>) => {
            state.departmentList = action.payload;
        },
        getCurrenciesFromApiAction: (state: SubmitFormState, action: PayloadAction<string[]>) => {
            state.currencyList = action.payload;
        },
        getDepartmentBearsFromApiAction: (state: SubmitFormState, action: PayloadAction<string[]>) => {
            state.departmentBearList = action.payload;
        },
        setFormValueAction: (state: SubmitFormState, action: PayloadAction<FormValues>) => {
            state.values = action.payload;
        }

    }

});

export const {
    getSuppliersFromApiAction,
    getDepartmentsFromApiAction,
    getCurrenciesFromApiAction,
    getDepartmentBearsFromApiAction,
    setFormValueAction
} = submitFormReducer.actions

export default submitFormReducer.reducer

export const getSuppliersFromApi = () => {
    return async (dispatch: AppDispatch) => {
        const res = await Axios({
            url: `http://localhost:5005/api/Supplier/supplier-name-list`,
            method: 'GET',
        })
        dispatch(getSuppliersFromApiAction(res.data));
    }
}

export const getDepartmentsFromApi = () => {
    return async (dispatch: AppDispatch) => {
        const res = await Axios({
            url: `http://localhost:5005/api/Department/department-name-list`,
            method: 'GET',
        })
        dispatch(getDepartmentsFromApiAction(res.data));
    }
}

export const getCurrenciesFromApi = () => {
    return async (dispatch: AppDispatch) => {
        const res = await Axios({
            url: `http://localhost:5005/api/Currency/currency-list`,
            method: 'GET',
        })
        dispatch(getCurrenciesFromApiAction(res.data));
    }
}

export const getDepartmentBearsFromApi = () => {
    return async (dispatch: AppDispatch) => {
        const res = await Axios({
            url: `http://localhost:5005/api/Department/department-bear-list`,
            method: 'GET',
        })
        dispatch(getDepartmentBearsFromApiAction(res.data));
    }
}

export const setFormValuesToRedux = (value:FormValues) => {
    return (dispatch: AppDispatch) => {
        dispatch(setFormValueAction(value));
    }
}