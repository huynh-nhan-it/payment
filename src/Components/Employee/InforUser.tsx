import React, { useState } from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Overview from "./Overview";
import Additional from "./Additional";
import Family from "./Family";
import Properties from "./Properties";
import Signature from "./Signature";

import jsonData from './api.json';
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import Avatar from "./Avatar";

interface Employee {
  key: string;
  name: string;
  infor: string;
  isEditable: boolean;
  type: string;
}

interface AdditionalInfor {
  key: string;
  label: string;
  children: {
    key: string;
    name: string;
    infor: string | number;
    isEditable: boolean;
    type: string;
  }[];
}

interface FamilyInfor {
  key: string;
  label: string;
  children: {
    key: string;
    name: string;
    infor: string | number;
    isEditable: boolean;
    type: string;
  }[]
}

const initialDataOverview: Employee[] = jsonData.initialDataOverview;
const initialDataAdditional: AdditionalInfor[] = jsonData.initialDataAdditional;
const initialDataFamily: FamilyInfor[] = jsonData.initialDataFamily;

// Access and work with the initialData array here
// console.log(initialDataAdditional);


const InforUser = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const [editable, setEditable] = useState(false);
  const [dataOverview, setDataOverview] = useState(initialDataOverview)
  const [dataAdditional, setDataAdditional] = useState<AdditionalInfor[]>(initialDataAdditional)
  const [dataFamily, setDataFamily] = useState<FamilyInfor[]>(initialDataFamily)
  const [data, setData] = useState<[Employee[], AdditionalInfor[], FamilyInfor[]]>([dataOverview, dataAdditional, dataFamily])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Overview`,
      children: <Overview
        data={dataOverview}
        setData={setDataOverview}
        isEditable={editable} />,
    },
    {
      key: '2',
      label: `Additional`,
      children: <Additional
        data={dataAdditional}
        setData={setDataAdditional}
        isEditable={editable}
      />
    },
    {
      key: '3',
      label: `Family`,
      children: <Family
        data={dataFamily}
        setData={setDataFamily}
        isEditable={editable}
      />,
    },
    {
      key: '4',
      label: `Properties`,
      children: <Properties />,
    },
    {
      key: '5',
      label: `Signature`,
      children: <Signature />,
    },
  ];
  const handleClickEdit = () => {
    setEditable(true);
  }

  const handleUpdateAvatar = () =>{
    console.log("avata");
  }
  return (
    <div>
      <HeaderEmployee setEditable={setEditable} data={data as [Employee[], AdditionalInfor[], FamilyInfor[]]} isEditable={editable} />
      <div className="employee-avatar-name-edit">
        <h2 className="name-employee">
        {editable && 
        <span style={{
          border: "#ccc solid 0.1px",
          borderRadius: "50%",
          background: "#555",
          padding: "5px 9px",
          position: "relative",
          right: "-30px"
        }}
          onClick={handleUpdateAvatar}
        >

          <BsFillCameraFill style={{color:"#fff"}}/>
        </span>
        }
          <span>

          <Avatar/> 
            {/* <img
              className="avatar-employee"
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"></img> */}
            
          </span>Bang Nguyen Minh </h2>
        <div onClick={handleClickEdit} className="edit-employee">
          {!editable && <TbUserEdit />}
        </div>

      </div>
      <Tabs style={{ padding: "16px" }} defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default InforUser;
