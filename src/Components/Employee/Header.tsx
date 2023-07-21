import React from "react";
import { Layout } from "antd";

import { AiOutlineSave } from "react-icons/ai";
import { TiArrowBackOutline } from "react-icons/ti";
const { Header } = Layout;

interface Employee {
  key: string;
  name: string;
  infor: string;
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
  }[];
}

interface HeaderEmployeeProps {
  isEditable: boolean;
  data: [Employee[], AdditionalInfor[], FamilyInfor[]];
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderEmployee: React.FC<HeaderEmployeeProps> = ({
  isEditable,
  data,
  setEditable,
}) => {
  const handleClickSave = () => {
    // console.log(isSave);
    console.log(data);
    setEditable(false);
  };
  return (
    <div>
      <Header
        className="header-employee"
        style={{
          display: "flex",
          backgroundColor: "#F5F6FA",
          alignItems: "center",
        }}>
        <div onClick={handleClickSave}>{isEditable && <AiOutlineSave />}</div>
        <div className="return-employee">
          <a href="/setting" className="text-header">
            <TiArrowBackOutline />
            Return
          </a>
        </div>
      </Header>
    </div>
  );
};

export default HeaderEmployee;
