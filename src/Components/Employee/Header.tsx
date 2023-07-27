import React from "react";
import { Layout } from "antd";

import { AiOutlineSave } from "react-icons/ai";
import { TiArrowBackOutline } from "react-icons/ti";
const { Header } = Layout;

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
  $id: string;
  Id: string;
  UserId: string;
  User: {
    $ref: string;
  };
  Nation: string;
  IDCardNumber: string;
  DateOfIDCard: string;
  PlaceOfIDCard: string;
  HealthInsurance: string;
  StartingDate: string;
  StartingDateOfficial: string;
  LeavingDate: string;
  StartDateMaternityLeave: string;
  Note: string;
  AcademicLevel: string;
  SpecializedQualification: string;
  BusinessPhone: string;
  HomePhone: string;
  PersonalEmail: string;
  BankName: string;
  BranchNumber: string;
  BankBranchName: string;
  BankAccountNumber: string;
  BankAccountName: string;
  Street: string;
  BuildingOrFlatNumber: string;
  City: string;
  ProvinceOrState: string;
  PostalCode: string;
  Country: string;
  contracts: {
    $id: string;
    $values: Contract[];
  };
}

interface Contract {
  $id: string;
  Id: string;
  AddtionalId: string;
  ContractType: string;
  FromDate: string;
  ToDate: string;
  SigningDate: string;
  Subject: string;
  Department: string;
  Note: string;
}

interface Family {
  $id: string;
  Id: string;
  UserId: string;
  User: {
    $ref: string;
  };
  MartialStatus: string;
  ContactName: string;
  Relationship: string;
  Phone: string;
  Street: string;
  BuildingOrFlatNumber: string;
  City: string;
  ProvinceOrState: string;
  PostalCode: string;
  Country: string;
  relationships: {
    $id: string;
    $values: Relationship[];
  };
}

interface Relationship {
  $id: string;
  Id: string;
  FamilyId: string;
  ContactName: string;
  BirthDay: string;
  Relationship: string;
  Note: string;
}

interface Signature {
  $id: string;
  Id: string;
  UserId: string;
  User: {
    $ref: string;
  };
  QRcode: string;
  dateTime: string;
  ImagePath: string;
}
interface UserInfo {
  $id: string;
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Avatar: string;
  AccountId: string;
  MyAccount: any;
  Roles: any;
  PaymentRequests: any;
  DetailRequests: any;
  JobTitle: string;
  Overview: OverviewInfor;
  Additional: AdditionalInfor;
  Family: Family;
  Signature: Signature;
  Departments: any;
}
interface HeaderEmployeeProps {
  isEditable: boolean;
  data: UserInfo;
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
          marginTop: "64px",
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
