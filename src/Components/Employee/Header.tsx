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
interface OverviewInfor {
  $id: string;
  Id: string;
  UserId: string;
  User: {
    $ref: string;
  };
  EmployeeNumber: number;
  Sex: string;
  BirthDay: string;
  Position: string;
  Company: string;
  Unit: string;
  FunctionEmployee: string;
  Department: string;
  SectionsTeams: string;
  Groups: string;
  OfficeLocation: string;
  LineManager: string;
  BelongToDepartments: string;
  CostCenter: string;
  Rank: string;
  EmployeeType: string;
  Rights: string;
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
  data: OverviewInfor;
  // data: [Employee[], AdditionalInfor[], FamilyInfor[]];
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
