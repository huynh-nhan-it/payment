import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { IModalShare } from "../../interface/IModal";
import type { SelectProps } from 'antd';
import axios from "axios";
import Spinner from "../../../common/Loading";
import { IUser } from "../../interface/IUser";


const ModalShare: React.FC<IModalShare> = ({
  isModalOpenShare,
  handleOkShare,
  handleCancelShare,
}) => {
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [isloading, setIsloading] = useState(true);
  const [options, setOptions] = useState<SelectProps['options']>([]);

  const handleChange = (value: any) => {
    setUsers(value);
  };

  useEffect(() => {
    axios.get(`http://localhost:5005/api/Approver`)
      .then((response) => {
        const data = response.data;
        const newOptions = data.map((item: any) => {
          return {
            lable: item?.fullName,
            value: item?.email.trim() + ' - ' + item.fullName.trim() + ' - ' + item.jobTitle.trim()
          }
        });
        setOptions(newOptions);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, []);

  return (
    <div>
      {isloading ? (
        <Spinner />
      ) : (
        <Modal
          centered={true}
          title="Share"
          open={isModalOpenShare}
          onOk={() => {
            handleOkShare?.(users)
          }}
          onCancel={handleCancelShare}
          okText="Share"
          cancelText="Close"
        >
          <Select
            mode="multiple"
            placeholder="Please select"
            onChange={handleChange}
            style={{ width: '100%' }}
            autoClearSearchValue={true}
            options={options}
            optionLabelProp="lable" // Đặt optionLabelProp là "label" để hiển thị "key" và "label"
          />
        </Modal>
      )}
    </div>
  );
};

export default ModalShare;
