import React from "react";
import { Layout } from "antd";

import { IoReturnDownBackSharp } from "react-icons/io5";
import { AiOutlineSave } from "react-icons/ai";
const { Header } = Layout;

interface Employee {
  key: string;
  name: string;
  infor: string;
}
interface AdditionalInfor{
  key: string;
  label: string;
  children: {
    key: string;
    name: string;
    infor: string|number;
    isEditable: boolean;
    type: string;
  }[]
}
interface FamilyInfor{
  key: string;
  label:string;
  children:{
    key: string;
    name: string;
    infor: string|number;
    isEditable: boolean;
    type: string;
  }[]
}

interface HeaderEmployeeProps {
  isEditable: boolean;
  data:[Employee[], AdditionalInfor[], FamilyInfor[]];
  setEditable: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderEmployee: React.FC<HeaderEmployeeProps> = ({ isEditable, data, setEditable }) => {


  const handleClickSave = () =>{
    // console.log(isSave);
    console.log(data);
    setEditable(false)
  }
  return (
    <Header
      className="header-employee"
      style={{
        display: "flex",
        backgroundColor: "#F5F6FA",
        alignItems: "center",
      }}>
      <div onClick={handleClickSave}>{isEditable && <AiOutlineSave />}</div>
      <IoReturnDownBackSharp />
      <div className="return-employee">Return</div>
    </Header>
  );
};

export default HeaderEmployee;
