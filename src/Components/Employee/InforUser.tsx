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
// const initialdataFamilyamily: FamilyInfor[] = jsonData.initialdataFamilyamily;

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
//   const [dataFamilyamily, setdataFamilyamily] = useState<FamilyInfor[]>(initialdataFamilyamily)
//   const [data, setData] = useState<[Employee[], AdditionalInfor[], FamilyInfor[]]>([dataOverview, dataAdditional, dataFamilyamily])

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
//         data={dataFamilyamily}
//         setData={setdataFamilyamily}
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
import request from "../../Services/User/getAccount";
import { Header } from "antd/es/layout/layout";
import { TiArrowBackOutline } from "react-icons/ti";
import { AdditionalInfor, Contract, UserInfo } from "./Interface";
// import { Data } from "./Data";

// interface UserInfoEdit {
//   Overview: {
//     EmployeeType: string;
//     Rank: string;
//   };
//   Additional: {
//     Nation: string;
//     IDCardNumber: string;
//     DateOfIDCard: string;
//     PlaceOfIDCard: string;
//     HealthInsurance: string;
//     StartingDate: string;
//     Note: string;
//     AcademicLevel: string;
//     SpecializedQualification: string;
//     BusinessPhone: string;
//     HomePhone: string;
//     PersonalEmail: string;
//     BankName: string;
//     BranchNumber: string;
//     BankBranchName: string;
//     BankAccountNumber: string;
//     BankAccountName: string;
//     Street: string;
//     BuildingOrFlatNumber: string;
//     City: string;
//     ProvinceOrState: string;
//     PostalCode: string;
//     Country: string;
//   };
//   Family: {
//     MartialStatus: string;
//     ContactName: string;
//     Relationship: string;
//     Phone: string;
//     Street: string;
//     BuildingOrFlatNumber: string;
//     City: string;
//     ProvinceOrState: string;
//     PostalCode: string;
//     Country: string;
//   };
//   Avatar: string;
// }

interface EmployeeData {
  additional: {
    BuildingOrFlatNumber: string;
    family: {
      ContactName: string;
      Relationship: string;
      MartialStatus: string;
      PostalCodeFamily: string;
      BuildingOrFlatNumberFamily: string;
      PhoneFamily: string;
      StreetFamily: string;
      CountryFamily: string;
      relationships: string;
      CityFamily: string;
    };
    Phone: string;
    BusinessPhone: string;
    HomePhone: string;
    Street: string;
    SpecializedQualification: string;
    BankName: string;
    Nation: string;
    Country: string;
    BankBranchName: string;
    BranchNumber: string;
    City: string;
    BankAccountNumber: string;
    BankAccountName: string;
    StartingDate: string;
    PersonalEmail: string;
    AcademicLevel: string;
    ProvinceOrState: string;
    DateOfIDCard: string;
    HealthInsurance: string;
    Note: string;
    Contracts: string;
    IDCardNumber: string;
    PostalCode: string;
  };
  overview: {
    Rank: string;
    EmployeeType: string;
  };
  signature: {
    QRcode: string;
    ImageSignature: string;
  };
  Avatar: string;
}
const initialDataAdditional: AdditionalInfor = {
  $id: '',
  Id: '',
  UserId: '',
  User: {
    $ref: '',
  },
  Nation: '',
  IDCardNumber: '',
  DateOfIDCard: '',
  PlaceOfIDCard: '',
  HealthInsurance: '',
  StartingDate: '',
  StartingDateOfficial: '',
  LeavingDate: '',
  StartDateMaternityLeave: '',
  Note: '',
  AcademicLevel: '',
  SpecializedQualification: '',
  BusinessPhone: '',
  HomePhone: '',
  PersonalEmail: '',
  BankName: '',
  BranchNumber: '',
  BankBranchName: '',
  BankAccountNumber: '',
  BankAccountName: '',
  Street: '',
  BuildingOrFlatNumber: '',
  City: '',
  ProvinceOrState: '',
  PostalCode: '',
  Country: '',
  contracts: {
    $id: '',
    $values: [],
  },
};

// Create an example Contract object
const contract1: Contract = {
  $id: 'contract1Id',
  Id: 'contract1Id',
  ContractType: 'Full-time',
  FromDate: '2023-07-28',
  ToDate: '2024-07-27',
  SigningDate: '2023-07-28',
  Subject: 'Employment Contract',
  Department: 'HR Department',
  Note: 'This is a sample contract.',
};

const InforUser = () => {
  const [dataOverview, setDataOverview] = useState<Record<string, string>>({});
  const [dataName, setDataName] = useState("");
  const [dataFamily, setdataFamily] = useState<Record<string, string>>({});
  const [dataAdditional, setDataAdditional] = useState<Record<string, string>>({});
  const [dataEmployee, setDataEmployee] = useState<UserInfo>();

  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUserInfor = async () => {
      const endpoint = "/Personal/EmployeeInfo?Id=" + id;
      const response = await request.get(endpoint).then((res) => {
        // console.log(res.data.userInfo.Additional);
        setDataName(
          res.data.userInfo.FirstName + " " + res.data.userInfo.LastName
        );
        setDataEmployee(res.data.userInfo);
        setDataOverview(res.data.userInfo.Overview);
        setDataAdditional(res.data.userInfo.Additional);
        setdataFamily(res.data.userInfo.Family);
      });
    };

    getUserInfor();
  }, []);

  console.log(dataAdditional);

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

  // const dataFamilyamilyInfor = {
  //   MartialStatus: {
  //     MartialStatus: dataEmployee?.Family.MartialStatus,
  //   },
  //   EmergencyContact: {
  //     ContactName: dataEmployee?.Family.ContactName,
  //     Relationship: dataEmployee?.Family.Relationship,
  //     Phone: dataEmployee?.Family.Phone,
  //   },
  // ["{"]
  //     Street: dataEmployee?.Family.Street,
  //     BuildingFlatnumber: dataEmployee?.Family.BuildingOrFlatNumber,
  //     City: dataEmployee?.Family.City,
  //     ProvinceState: dataEmployee?.Family.ProvinceOrState,
  //     PostalCode: dataEmployee?.Family.PostalCode,
  //     Country: dataEmployee?.Family.Country,
  //   },
  // };

  // console.log(dataFamilyamilyInfor);
  const onChange = (key: string) => {
    console.log(key);
  };
  const [editable, setEditable] = useState(false);

  // console.log(dataAdditional);
  // console.log(dataAdditional);
  // console.log(dataAdditional);
  const dataEditUserInfo = {
    Overview: {
      EmployeeType: dataOverview["EmployeeType"],
      Rank: dataOverview["Rank"],
    },
    Additional: {
      Nation: dataAdditional["Nation"],
      IDCardNumber: dataAdditional["IDCardNumber"],
      DateOfIDCard: dataAdditional["DateOfIDCard"],
      PlaceOfIDCard: dataAdditional["PlaceOfIDCard"],
      HealthInsurance: dataAdditional["HealthInsurance"],
      StartingDate: dataAdditional["StartingDate"],
      Note: dataAdditional["Note"],
      AcademicLevel: dataAdditional["AcademicLevel"],
      SpecializedQualification: dataAdditional["SpecializedQualification"],
      BusinessPhone: dataAdditional["BusinessPhone"],
      HomePhone: dataAdditional["Phone"],
      PersonalEmail: dataAdditional["PersonalEmail"],
      BankName: dataAdditional["Bank account"],
      BranchNumber: dataAdditional["BranchNumber"],
      BankBranchName: dataAdditional["BankBranchName"],
      BankAccountNumber: dataAdditional["BankAccountNumber"],
      BankAccountName: dataAdditional["BankAccountName"],
      Street: dataAdditional["Street"],
      BuildingOrFlatNumber: dataAdditional["BuildingOrFlatNumber"],
      City: dataAdditional["City"],
      ProvinceOrState: dataAdditional["ProvinceOrState"],
      PostalCode: dataAdditional["PostalCode"],
      Country: dataAdditional["Country"],
    },
    Family: {
      MartialStatus: dataFamily["MartialStatus"],
      ContactName: dataFamily["ContactName"],
      Phone: dataFamily["Phone"],
      Relationship: dataFamily["Relationship"],
      Street: dataFamily["Street"],
      BuildingOrFlatNumber: dataFamily["BuildingOrFlatNumber"],
      City: dataFamily["City"],
      ProvinceOrState: dataFamily["ProvinceState"],
      PostalCode: dataFamily["PostalCode"],
      Country: dataFamily["Country"],
    },
    Avatar: "test",
  };
  // console.log(dataAdditional["Data"]);
  console.log(dataEditUserInfo);
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
          data={dataAdditional}
          setData={setDataAdditional}
          isEditable={editable}
        />
      ),
    },
    {
      key: "3",
      label: `Family`,
      children: (
        <Family
          data={dataFamily}
          setData={setdataFamily}
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
      children: <Signature  />,
    },
  ];
  const handleClickEdit = () => {
    setEditable(true);
  };

  const handleUpdateAvatar = () => {
    console.log("avata");
  };

  const initialEmployeeData: EmployeeData = {
    additional: {
      BuildingOrFlatNumber: '',
      family: {
        ContactName: '',
        Relationship: '',
        MartialStatus: '',
        PostalCodeFamily: '',
        BuildingOrFlatNumberFamily: '',
        PhoneFamily: '',
        StreetFamily: '',
        CountryFamily: '',
        relationships: '',
        CityFamily: '',
      },
      Phone: '',
      BusinessPhone: '',
      HomePhone: '',
      Street: '',
      SpecializedQualification: '',
      BankName: '',
      Nation: '',
      Country: 'test',
      BankBranchName: 'test',
      BranchNumber: '',
      City: '',
      BankAccountNumber: '',
      BankAccountName: '',
      StartingDate: '',
      PersonalEmail: '',
      AcademicLevel: '',
      ProvinceOrState: '',
      DateOfIDCard: '',
      HealthInsurance: '',
      Note: '',
      Contracts: '',
      IDCardNumber: '',
      PostalCode: '',
    },
    overview: {
      Rank: '',
      EmployeeType: '',
    },
    signature: {
      QRcode: '',
      ImageSignature: '',
    },
    Avatar: '',
  };

  const handleClickSave =  async ()  => {
    // console.log(isSave);

    // console.log(id);
    setEditable(false);

    try {
      console.log(initialEmployeeData);
  
      const response = await request.put("/Personal/EditInfoEmployee?Id=" + id, initialEmployeeData);
      console.log(response.data);
      // Xử lý phản hồi thành công (nếu cần)
  
    } catch (error) {
      console.error("Error occurred:", error);
      // Xử lý lỗi ở đây (nếu cần)
    }
    // const EditUserInfo = async () => {
    //   const endpoint = "/Personal/EditInfoEmployee?Id=" + id;
    //   const response = await request
    //     .put(endpoint, initialEmployeeData)
    //     .then((res) => {
    //       console.log(res.data);
    //     });
    // };

    // EditUserInfo();
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
        <div style={{paddingLeft:"50px"}} onClick={handleClickSave}>{editable && <AiOutlineSave />}</div>
        <div className="return-employee">
          <a href="/setting" className="text-header">
            <TiArrowBackOutline />
            Return
          </a>
        </div>
      </Header>
      <div className="employee-avatar-name-edit">
        <h2 className="name-employee">
          
          <span>
            <Avatar />
            {/* <img
              className="avatar-employee"
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"></img> */}
          </span>
         {dataName}
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
// {editable && (
//   <span
//     style={{
//       border: "#ccc solid 0.1px",
//       borderRadius: "50%",
//       background: "#555",
//       padding: "5px 9px",
//       position: "relative",
//       right: "-30px",
//     }}
//     onClick={handleUpdateAvatar}>
//     <BsFillCameraFill style={{ color: "#fff" }} />
//   </span>
// )}