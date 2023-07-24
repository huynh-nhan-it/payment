// paymentRequestService.ts
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

//POST API
type PostData = {
    purpose: string;
    departmentName: string;
    paymentFor: string;
    supplierName: string;
    currency: string;
    poNumber: number;
    paymentMethod: string;
  };
  
  // Hàm gọi API để thực hiện Post dữ liệu
  export const postPaymentRequest = async (data: PostData) => {
    try {
      const response = await axios.post('http://localhost:5005/api/DetailRequest', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
