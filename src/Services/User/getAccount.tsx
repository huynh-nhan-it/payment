import axios from "axios";


const apiStr = 'http://localhost:5005/api/'
export const getUser = async () => {
  try {
    const response = await axios.post("http://localhost:5005/api/Authen/Login");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.post(`${apiStr}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEmployeeInfor = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5005/api/Personal/EmployeeInfo?Id=A3E4D297-29AE-42F8-A2F7-9D511F31B0B9"
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


