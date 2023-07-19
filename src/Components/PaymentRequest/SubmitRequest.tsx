import React, { useState } from 'react';
import FormRequest from './FormRequest';
import TableRequest from './TableRequest';
import axios from 'axios';
import dayjs from 'dayjs';
import Item from 'antd/es/descriptions/Item.js';

const ParentComponent = () => {
  const [request, setRequest] = useState({
    formData: {
      purpose: '',
      department: '',
      paymentFor: '',
      supplier: '',
      currency: '',
      poPrNumber: '',
    },
    paymentMethod: { paymentMethod: '' },
  });
  
  const handleFormSubmit = (data: any) => {
    setRequest((prevData) => ({
      ...prevData,
      formData: data,
    }));
  };
  
  const handleTableDataChange = (data: any) => {
    setRequest((prevData) => ({
      ...prevData,
      paymentMethod: data,
    }));
  };

  const handleSubmit = () => {
    console.log(request)
    // Gửi dữ liệu formData và tableData lên API bằng Axios
    axios.post('http://localhost:5005/api/DetailRequest', request)
      .then(response => {
        // Xử lý kết quả sau khi gửi thành công
      })
      .catch(error => {
        // Xử lý lỗi trong quá trình gửi
      });
  };

  return (
    <div>
      <FormRequest onChange={handleFormSubmit} />
      <TableRequest onChange={handleTableDataChange} />
      <button onClick={() => {
        handleSubmit()
      }}>Submit</button>
    </div>
  );
};

export default ParentComponent;
