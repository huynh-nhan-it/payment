import axios from "axios";

const apiStr = "http://localhost:5005/api/";
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

const API_URL = "http://localhost:5005/api/";

const getToken = () => {
  try {
    return String(localStorage.getItem("authToken"));
  } catch (error) {
    return "";
  }
};

const token = getToken();

const request = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const get = async (endpoint: string, options = {}) => {
  const token = getToken();
  console.log(token);
  return await request.get(endpoint);
};

export const post = async (endpoint: string, data = {}) => {
  // const token = getToken();
  return await request.post(endpoint, data, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postForm = async (endpoint: string, data = {}) => {
  // const token = getToken();
  return await request.post(endpoint, data, {
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const put = async (endpoint: string, data: any) => {
  // const token = getToken();
  return await request.put(endpoint, data, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${token}`,
    // },
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const patch = async (endpoint: string, data = {}) => {
  // const token = getToken();
  return await request.patch(endpoint, data, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const remove = async (endpoint: string, data = {}) => {
  // const token = getToken();
  return await request.delete(endpoint, {
    data,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


export default request;
