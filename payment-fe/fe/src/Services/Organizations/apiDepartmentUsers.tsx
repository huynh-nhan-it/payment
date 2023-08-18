import axios from "axios";

const getDepartmentUsers = async (departmentName: any) => {
  try {
    const url = `http://localhost:5005/api/Department/department-name?DepartmentName=${departmentName}`;
    const response = await axios.get(url);

    // Ở đây, bạn có thể xử lý kết quả trả về từ API trước khi trả về
    // Ví dụ: nếu API trả về một mảng dữ liệu người dùng, bạn có thể lọc hoặc sắp xếp dữ liệu ở đây

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(error);
    return []; // Nếu xảy ra lỗi, bạn có thể trả về một mảng rỗng hoặc giá trị mặc định khác tuỳ vào trường hợp sử dụng.
  }
};

export { getDepartmentUsers };


const getCheckManager = async (UserId:any, departmentName: any) =>{
  try {
    const url = `http://localhost:5005/api/Department/is-manager?UserId=${UserId}&departmentName=${departmentName}`;
    const response = await axios.get(url);

    // Ở đây, bạn có thể xử lý kết quả trả về từ API trước khi trả về
    // Ví dụ: nếu API trả về một mảng dữ liệu người dùng, bạn có thể lọc hoặc sắp xếp dữ liệu ở đây

    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(error);
    return []; // Nếu xảy ra lỗi, bạn có thể trả về một mảng rỗng hoặc giá trị mặc định khác tuỳ vào trường hợp sử dụng.
  }
};
export {getCheckManager}
