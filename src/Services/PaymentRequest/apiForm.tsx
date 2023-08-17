// paymentRequestService.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//GET API
// Hàm gọi API để lấy dữ liệu Supplier
export const getSuppliers = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Supplier/supplier-name-list');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Hàm gọi API để lấy dữ liệu Currency
export const getCurrencies = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Currency/currency-list');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Hàm gọi API để lấy dữ liệu Department
export const getDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Department/department-name-list');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBearDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Department/department-bear-list');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSupplierFromApi = async () => {
  const res = await axios({
      url: `http://localhost:5005/api/Supplier/supplier-name-list`,
      method: 'GET',
  })
  return res.data;
}
