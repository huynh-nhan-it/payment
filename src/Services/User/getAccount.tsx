import axios from 'axios';

//GET API
// Hàm gọi API để lấy dữ liệu Supplier
export const getUser = async () => {
  try {
    const response = await axios.post('http://localhost:5005/api/Authen/Login');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};