import axios from 'axios';

//GET API
// Hàm gọi API để lấy dữ liệu DepartmentCost
export const getDepartmentCost = async () => {
  try {
    const response = await axios.get('http://localhost:5005/api/Department/department-bear-list');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};