import axios from "axios";
import { useEffect, useState } from "react";


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


export const GetEmployeeInfor = async () => {
  
  // console.log(email);
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



const API_URL = 'http://localhost:5005/api/';

const getToken = () => {
    try {
        return String(localStorage.getItem('authToken'));
    } catch (error) {
        return '';
    }
};

const token = getToken();

const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
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
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postForm = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.post(endpoint, data, {
        headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const put = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.put(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const patch = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.patch(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const remove = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.delete(endpoint, {
        data,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export default request;