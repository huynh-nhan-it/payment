import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import axios from 'axios';

const DeleteDepartment: React.FC <{departmentName: string | undefined }> = ({ departmentName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5005/api/Department?departmentName=${departmentName}`)
      .then((response) => {
        console.log("Response from API:", response.data);
        // Xử lý dữ liệu trả về nếu cần thiết

        // Tải lại trang
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a style={{ color: "#8894A1" }} onClick={showModal}>
      <Space>Delete Department</Space>
        {" "}
      </a>
      <Modal title="Are you sure delete this departemnt ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>When you delete this department, all data in the department will also be deleted. You should consider carefully. </p>
      </Modal>
    </>
  );
};

export default DeleteDepartment;