import React from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Overview from "./Overview";
import Additional from "./Additional";
import Family from "./Family";
import Properties from "./Properties";
import Signature from "./Signature";

const InforUser = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Overview`,
      children: <Overview/>,
    },
    {
      key: '2',
      label: `Additional`,
      children: <Additional/>,
    },
    {
      key: '3',
      label: `Family`,
      children: <Family/>,
    },
    {
      key: '4',
      label: `Properties`,
      children: <Properties/>,
    },
    {
      key: '5',
      label: `Signature`,
      children: <Signature/>,
    },
  ];
  const handleClickEdit = () =>{
    
  }
  return (
    <div>
      <HeaderEmployee />
      <div className="employee-avatar-name-edit">
        <img
          className="avatar-employee"
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"></img>
        <h2 className="name-employee">Bang Nguyen Minh</h2>
        <div onClick={handleClickEdit} className="edit-employee">
          <TbUserEdit />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default InforUser;
