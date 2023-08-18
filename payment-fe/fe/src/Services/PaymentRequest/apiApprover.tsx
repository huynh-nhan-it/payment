import axios from 'axios';

//GET API
// Hàm gọi API để lấy dữ liệu Approver
export const getApprover = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Approver');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};