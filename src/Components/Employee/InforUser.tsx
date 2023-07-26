// import React, { useEffect, useState } from "react";
// import HeaderEmployee from "./Header";
// import { TbUserEdit } from "react-icons/tb";
// import "./employee.css";
// import { TabsProps } from 'antd';
// import { Tabs } from 'antd';
// import Overview from "./Overview";
// import Additional from "./Additional";
// import Family from "./Family";
// import Properties from "./Properties";
// import Signature from "./Signature";

// import jsonData from './api.json';
// import { BsFillCameraFill } from "react-icons/bs";
// import { AiOutlineCamera } from "react-icons/ai";
// import Avatar from "./Avatar";
// import { getEmployeeInfor } from "../../Services/User/getAccount";

// interface Employee {
//   key: string;
//   name: string;
//   infor: string;
//   isEditable: boolean;
//   type: string;
// }

// interface AdditionalInfor {
//   key: string;
//   label: string;
//   children: {
//     key: string;
//     name: string;
//     infor: string | number;
//     isEditable: boolean;
//     type: string;
//   }[];
// }

// interface FamilyInfor {
//   key: string;
//   label: string;
//   children: {
//     key: string;
//     name: string;
//     infor: string | number;
//     isEditable: boolean;
//     type: string;
//   }[]
// }

// const initialDataOverview: Employee[] = jsonData.initialDataOverview;
// const initialDataAdditional: AdditionalInfor[] = jsonData.initialDataAdditional;
// const initialDataFamily: FamilyInfor[] = jsonData.initialDataFamily;

// // Access and work with the initialData array here
// // console.log(initialDataAdditional);

// const InforUser = () => {

//   const [dataEmployee, setDataExcel] = useState();
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const data = await getEmployeeInfor();
//       console.log(data.userInfo.Overview);
//       setDataExcel(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onChange = (key: string) => {
//     console.log(key);
//   };
//   const [editable, setEditable] = useState(false);
//   const [dataOverview, setDataOverview] = useState(initialDataOverview)
//   const [dataAdditional, setDataAdditional] = useState<AdditionalInfor[]>(initialDataAdditional)
//   const [dataFamily, setDataFamily] = useState<FamilyInfor[]>(initialDataFamily)
//   const [data, setData] = useState<[Employee[], AdditionalInfor[], FamilyInfor[]]>([dataOverview, dataAdditional, dataFamily])

//   const items: TabsProps['items'] = [
//     {
//       key: '1',
//       label: `Overview`,
//       children: <Overview
//         data={dataOverview}
//         setData={setDataOverview}
//         isEditable={editable} />,
//     },
//     {
//       key: '2',
//       label: `Additional`,
//       children: <Additional
//         data={dataAdditional}
//         setData={setDataAdditional}
//         isEditable={editable}
//       />
//     },
//     {
//       key: '3',
//       label: `Family`,
//       children: <Family
//         data={dataFamily}
//         setData={setDataFamily}
//         isEditable={editable}
//       />,
//     },
//     {
//       key: '4',
//       label: `Properties`,
//       children: <Properties />,
//     },
//     {
//       key: '5',
//       label: `Signature`,
//       children: <Signature />,
//     },
//   ];
//   const handleClickEdit = () => {
//     setEditable(true);
//   }

//   const handleUpdateAvatar = () =>{
//     console.log("avata");
//   }
//   return (
//     <div>
//       <HeaderEmployee setEditable={setEditable} data={data as [Employee[], AdditionalInfor[], FamilyInfor[]]} isEditable={editable} />
//       <div className="employee-avatar-name-edit">
//         <h2 className="name-employee">
//         {editable &&
//         <span style={{
//           border: "#ccc solid 0.1px",
//           borderRadius: "50%",
//           background: "#555",
//           padding: "5px 9px",
//           position: "relative",
//           right: "-30px"
//         }}
//           onClick={handleUpdateAvatar}
//         >

//           <BsFillCameraFill style={{color:"#fff"}}/>
//         </span>
//         }
//           <span>

//           <Avatar/>
//             {/* <img
//               className="avatar-employee"
//               src="https://img.freepik.com/free-icon/user_318-159711.jpg"></img> */}

//           </span>Bang Nguyen Minh </h2>
//         <div onClick={handleClickEdit} className="edit-employee">
//           {!editable && <TbUserEdit />}
//         </div>

//       </div>
//       <Tabs style={{ padding: "16px" }} defaultActiveKey="1" items={items} onChange={onChange} />
//     </div>
//   );
// };

// export default InforUser;

import React, { useEffect, useState } from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { TabsProps } from "antd";
import { Tabs } from "antd";
import Overview from "./Overview";
import Additional from "./Additional";
import Family from "./Family";
import Properties from "./Properties";
import Signature from "./Signature";

import jsonData from "./api.json";
import { BsFillCameraFill } from "react-icons/bs";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import Avatar from "./Avatar";
import request, { GetEmployeeInfor } from "../../Services/User/getAccount";
import { Header } from "antd/es/layout/layout";
import { TiArrowBackOutline } from "react-icons/ti";
// import { Data } from "./Data";
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

interface UserInfoEdit {
  Overview: {
    EmployeeType: string;
    Rank: string;
  };
  Additional: {
    Nation: string;
    IDCardNumber: string;
    DateOfIDCard: string;
    PlaceOfIDCard: string;
    HealthInsurance: string;
    StartingDate: string;
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
  };
  Family:{
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
  }
}
const InforUser = () => {
  const [dataOverview, setDataOverview] = useState<Record<string, string>>({});
  const [dataTest, setDataTest] = useState({});
  const [dataFamily, setDataFamily] = useState<{}>({});
  const [dataAdditional, setDataAdditional] = useState<{}>({});
  const [dataEmployee, setDataEmployee] = useState<UserInfo>();

  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUserInfor = async () => {
      const endpoint = "/Personal/EmployeeInfo?Id=" + id;
      const response = await request.get(endpoint).then((res) => {
        // console.log(res.data);
        setDataEmployee(res.data.userInfo);
        setDataOverview(res.data.userInfo.Overview);
        setDataAdditional(res.data.userInfo.Additional);
        setDataFamily(res.data.userInfo.Family);
      });
    };

    getUserInfor();
  }, []);

  // http://localhost:5005/api/Personal/EditInfoEmployee?Id=

  const newDataOverview = {
    "First-name": dataEmployee?.FirstName,
    "Last-name": dataEmployee?.LastName,
    Login: dataEmployee?.Email,
    Email: dataEmployee?.Email,
    "Job-Title": dataEmployee?.JobTitle,
  };
  const mergedObject = { ...newDataOverview, ...dataOverview };

  const dataAdditionalInfor = {
    Data: {
      Nation: dataEmployee?.Additional.Nation,
      Phone: dataEmployee?.Additional.HomePhone,
      "ID card number": dataEmployee?.Additional.IDCardNumber,
      "Date of ID Card": dataEmployee?.Additional.DateOfIDCard,
      "Place of ID card": dataEmployee?.Additional.PlaceOfIDCard,
      "Health insurance": dataEmployee?.Additional.HealthInsurance,
      "Starting date": dataEmployee?.Additional.StartingDate,
      "Starting date offical": dataEmployee?.Additional.StartingDateOfficial,
      "Leaving date": dataEmployee?.Additional.LeavingDate,
      "Start Date Maternity Leave":
        dataEmployee?.Additional.StartDateMaternityLeave,
      Note: dataEmployee?.Additional.StartDateMaternityLeave,
    },
    Literacy: {
      "Academic level": dataEmployee?.Additional.AcademicLevel,
      "Specialized qualification":
        dataEmployee?.Additional.SpecializedQualification,
    },
    "Contact Info": {
      "Business phone": dataEmployee?.Additional.BusinessPhone,
      "Home phone": dataEmployee?.Additional.HomePhone,
      "Personal email": dataEmployee?.Additional.PersonalEmail,
    },
    "Bank account": {
      "Bank Name": dataEmployee?.Additional.BankName,
      "Branch number": dataEmployee?.Additional.BankAccountNumber,
      "Bank brach name": dataEmployee?.Additional.BankBranchName,
      "Bank account number": dataEmployee?.Additional.BankAccountNumber,
      "Bank Account Name": dataEmployee?.Additional.BankAccountName,
    },
    Address: {
      Street: dataEmployee?.Additional.Street,
      "Building / flatnumber": dataEmployee?.Additional.BuildingOrFlatNumber,
      City: dataEmployee?.Additional.City,
      "Province / state": dataEmployee?.Additional.ProvinceOrState,
      "Postal code": dataEmployee?.Additional.PostalCode,
      Country: dataEmployee?.Additional.Country,
    },
  };

  const dataFamilyInfor = {
    MartialStatus: {
      MartialStatus: dataEmployee?.Family.MartialStatus,
    },
    "Emergency Contact": {
      "Contact name": dataEmployee?.Family.ContactName,
      Relationship: dataEmployee?.Family.Relationship,
      Phone: dataEmployee?.Family.Phone,
    },
    "Permanent Address": {
      Street: dataEmployee?.Family.Street,
      "Building / flatnumber": dataEmployee?.Family.BuildingOrFlatNumber,
      City: dataEmployee?.Family.City,
      "Province / state": dataEmployee?.Family.ProvinceOrState,
      "Postal code": dataEmployee?.Family.PostalCode,
      Country: dataEmployee?.Family.Country,
    },
  };

 
  // console.log(dataFamilyInfor);
  const onChange = (key: string) => {
    console.log(key);
  };
  const [editable, setEditable] = useState(false);

  // console.log(dataOverview['Rank']);
  // const dataOverviewUpdate = dataOverview["Rank"];
  // const dataEmployeeTypeUpdate = dataOverview["EmployeeType"];
  // console.log(dataOverviewUpdate, dataEmployeeTypeUpdate);
  const dataEditUserInfo = {
    Overview: {
      EmployeeType: dataOverview["EmployeeType"],
      Rank: dataOverview["Rank"]
    }
  }
  // console.log(dataAdditionalInfor);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Overview`,
      children: (
        <Overview
          data={mergedObject}
          isEditable={editable}
          setData={setDataOverview}
        />
      ),
    },
    {
      key: "2",
      label: `Additional`,
      children: (
        <Additional
          data={dataAdditionalInfor}
          // setData={setDataAdditional}
          isEditable={editable}
        />
      ),
    },
    {
      key: "3",
      label: `Family`,
      children: (
        <Family
          data={dataFamilyInfor}
          setData={setDataFamily}
          isEditable={editable}
        />
      ),
    },
    {
      key: "4",
      label: `Properties`,
      children: <Properties />,
    },
    {
      key: "5",
      label: `Signature`,
      children: <Signature />,
    },
  ];
  const handleClickEdit = () => {
    setEditable(true);
  };

  const handleUpdateAvatar = () => {
    console.log("avata");
  };
  const handleClickSave = () => {
    // console.log(isSave);
    // console.log(data);
    setEditable(false);
    const EditUserInfo = async () => {
      const endpoint = "/Personal/EditInfoEmployee?Id=" + id;
      const response = await request.put(endpoint,dataEditUserInfo).then((res) => {
        console.log(res.data);
      });
    };

    EditUserInfo();
  };
  // http://localhost:5005/api/Personal/EditInfoEmployee?Id=07A2FE81-BBD7-47C0-8095-668596515EFB
  
  // http://localhost:5005/api/Personal/EditInfoEmployee?Id=07a2fe81-bbd7-47c0-8095-668596515efb
  return (
    <div>
      {/* , Additional[], Family[] */}
      {/* <HeaderEmployee
        setEditable={setEditable}
        data={dataEmployee as UserInfo}
        isEditable={editable}
      /> */}
      <Header
        className="header-employee"
        style={{
          display: "flex",
          backgroundColor: "#F5F6FA",
          marginTop: "64px",
          alignItems: "center",
        }}>
        <div onClick={handleClickSave}>{editable && <AiOutlineSave />}</div>
        <div className="return-employee">
          <a href="/setting" className="text-header">
            <TiArrowBackOutline />
            Return
          </a>
        </div>
      </Header>
      <div className="employee-avatar-name-edit">
        <h2 className="name-employee">
          {editable && (
            <span
              style={{
                border: "#ccc solid 0.1px",
                borderRadius: "50%",
                background: "#555",
                padding: "5px 9px",
                position: "relative",
                right: "-30px",
              }}
              onClick={handleUpdateAvatar}>
              <BsFillCameraFill style={{ color: "#fff" }} />
            </span>
          )}
          <span>
            <Avatar />
            {/* <img
              className="avatar-employee"
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"></img> */}
          </span>
          Bang Nguyen Minh{" "}
        </h2>
        <div onClick={handleClickEdit} className="edit-employee">
          {!editable && <TbUserEdit />}
        </div>
      </div>
      <Tabs
        style={{ padding: "16px" }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default InforUser;
