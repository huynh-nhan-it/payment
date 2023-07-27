// import React, { useState } from "react";
// import HeaderEmployee from "./Header";
// import { TbUserEdit } from "react-icons/tb";
// import "./employee.css";
// import { Breakpoint, Button, Col, Form, Input, Row, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";
// import jsonData from "./api.json";
// import { json } from "react-router-dom";

// interface Employee {
//   key: string;
//   name: string;
//   infor: string;
//   isEditable: boolean;
//   type: string;
// }

// interface OverviewInfor {
//   $id: string;
//   Id: string;
//   UserId: string;
//   User: {
//     $ref: string;
//   };
//   EmployeeNumber: number;
//   Sex: string;
//   BirthDay: string;
//   Position: string;
//   Company: string;
//   Unit: string;
//   FunctionEmployee: string;
//   Department: string;
//   SectionsTeams: string;
//   Groups: string;
//   OfficeLocation: string;
//   LineManager: string;
//   BelongToDepartments: string;
//   CostCenter: string;
//   Rank: string;
//   EmployeeType: string;
//   Rights: string;
// }
// interface OverviewProps {
//   data: OverviewInfor[];
//   isEditable?: boolean;
//   setData: React.Dispatch<React.SetStateAction<OverviewInfor[]>>;
// }

// const Overview: React.FC<OverviewProps> = ({ data, isEditable, setData }) => {
//   // const handleInputChange = (
//   //   value: string | number,
//   //   key: string,
//   //   dataIndex: keyof Overview
//   // ) => {
//   //   const updatedData = data.map((row) => {
//   //     if (row.key === key) {
//   //       // console.log(dataIndex);
//   //       return { ...row, [dataIndex]: value };
//   //     }
//   //     return row;
//   //   });
//   //   setData(updatedData);
//   // };
//   // console.log(data);

//   // const columns = [
//   //   {
//   //     title: "Name",
//   //     dataIndex: "name",
//   //     key: "name",
//   //   },

//   //   {
//   //     title: "Infor",
//   //     dataIndex: "infor",
//   //     key: "infor",
//   //     render: (text: string, record: Employee) =>
//   //       (isEditable) ? (
//   //         <Form>
//   //           <Form.Item>
//   //             {record.isEditable ?
//   //               (<Input
//   //                 value={text}
//   //                 onChange={(e) =>
//   //                   handleInputChange(e.target.value, record.key, "infor")
//   //                 }
//   //               />) : (
//   //                 <Input
//   //                   value={text}
//   //                   disabled={true}
//   //                 />
//   //               )}
//   //           </Form.Item>
//   //         </Form>
//   //       ) : (
//   //         text
//   //       ),
//   //   },
//   // ];

//   return (
//     <div>
//       {/* <Button onClick={handleSave} >Save</Button> */}
//       {/* <Form
//        fields={data}> */}
//       <Form>
//         <Form.Item
//           colon={false}
//           labelCol={{ span: 6, style: { display: "flex" } }} // Set the label column span to 8
//           style={{
//             padding: "4px 8px",
//             borderBottom: "solid #ccc 0.2px",
//             marginBottom: "0px",
//           }}
//           key={1}
//           label="Login">
//           {isEditable ? (
//             <Input
//               style={{ width: "100%" }}
//               value=""
//               // onChange={(e) =>
//               //   handleInputChange(e.target.value, "item.key", "infor")
//               // }
//             />
//           ) : (
//             <span style={{ display: "flex", alignItems: "start" }}>
//               {"email"}
//             </span>
//           )}
//         </Form.Item>
//         {/* {data.map((item) => (
//           <Form.Item
//             colon={false}
//             labelCol={{ span: 6, style: { display: "flex" } }} // Set the label column span to 8
//             style={{
//               padding: "4px 8px",
//               borderBottom: "solid #ccc 0.2px",
//               marginBottom: "0px",
//             }}
//             key={item.key}
//             label={item.name}>
//             {isEditable ? (
//               item.isEditable ? (
//                 <Input
//                   style={{ width: "100%" }}
//                   value={item.infor}
//                   onChange={(e) =>
//                     handleInputChange(e.target.value, item.key, "infor")
//                   }
//                 />
//               ) : (
//                 <Input
//                   style={{ width: "100%" }}
//                   value={item.infor}
//                   disabled={true}
//                 />
//               )
//             ) : (
//               <span style={{ display: "flex", alignItems: "start" }}>
//                 {item.infor}
//               </span>
//             )}
//           </Form.Item>
//         ))} */}
//       </Form>
//       {/* <Table
//         columns={columns}
//         dataSource={data}
//         size="middle"
//         pagination={false}
//         showHeader={false}
//       />{" "} */}
//     </div>
//   );
// };

// export default Overview;

import React, { useEffect, useState } from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { Breakpoint, Button, Col, Form, Input, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import jsonData from "./api.json";
import { json } from "react-router-dom";
import { GetEmployeeInfor } from "../../Services/User/getAccount";

interface Employee {
  key: string;
  name: string;
  infor: string;
  isEditable: boolean;
  type: string;
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

interface Additional {
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
  Additional: Additional;
  Family: Family;
  Signature: Signature;
  Departments: any;
}
interface MyObject {
  [key: string]: any;
}

interface OverviewProps {
  data:MyObject;
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}

const Overview: React.FC<OverviewProps> = ({ data, isEditable, setData }) => {

  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const handleInputChange = (
    value: string | number,
    label: string,
    // dataIndex: keyof OverviewProps
  ) => {

    const updatedData: MyObject = { ...data };
    
    // Tìm thuộc tính có label trùng với label nhận được và cập nhật giá trị mới
    updatedData[label] = value;

    
    // Cập nhật state với dữ liệu mới
    setData(updatedData);
    // setDataOverviewEdit()

    // const updatedData: any= formItems.map((row:any) => {
    //   // console.log(row, value, label);
    //   if (row.label === label) {
    //     // console.log(dataIndex);
    //     // console.log(value);
    //     return { ...row, value: value };
    //   }
    //   console.log(row);
    //   return row;
    // });
    // // setData(updatedData)
    // setDataOverview(updatedData)
    // console.log(data);
    // console.log(dataIndex);
    // console.log(value);
    // console.log(label);
    // console.log(data);
    // console.log(updatedData[label]);
    // if(updatedData["Rank"]||updatedData["EmployeeType"]){

    //   setDataRank(updatedData["Rank"])
    //   setDataEmployeeType(updatedData["EmployeeType"])
    //   setDataOverviewEdit({dataRank, dataEmployeeType})
    // }
    // console.log(dataOverviewEdit);
  };
  console.log(data);

  // console.log(data["Rank"]);
  // console.log(data["EmployeeType"]);

  // console.log(data);


  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },

  //   {
  //     title: "Infor",
  //     dataIndex: "infor",
  //     key: "infor",
  //     render: (text: string, record: Employee) =>
  //       (isEditable) ? (
  //         <Form>
  //           <Form.Item>
  //             {record.isEditable ?
  //               (<Input
  //                 value={text}
  //                 onChange={(e) =>
  //                   handleInputChange(e.target.value, record.key, "infor")
  //                 }
  //               />) : (
  //                 <Input
  //                   value={text}
  //                   disabled={true}
  //                 />
  //               )}
  //           </Form.Item>
  //         </Form>
  //       ) : (
  //         text
  //       ),
  //   },
  // ];

  return (
    <div>

      {/* <Button onClick={handleSave} >Save</Button> */}
      <Form>
        {/* <Form> */}
        {formItems.map((item) =>
          (item.label === "User"|| item.label==="$id"|| item.label==="Id"|| item.label==="UserId") ? (
            ""
          ) : (
            <Form.Item
              label={item.label}
              colon={false}
              labelCol={{ span: 6, style: { display: "flex" } }} // Set the label column span to 8
              style={{
                padding: "4px 8px",
                borderBottom: "solid #ccc 0.2px",
                marginBottom: "0px",
              }}
              key={item.label}
              >
              {isEditable ? (
                (item.label==='Rank' || item.label==='EmployeeType')
                ? (
                  <Input
                    style={{ width: "100%" }}
                    defaultValue={item.value}
                    onChange={(e) =>
                      handleInputChange(e.target.value, item.label)
                    }
                  />
                ) : (
                  <Input
                    style={{ width: "100%" }}
                    value={item.value}
                    disabled={true}
                  />
                )
              ) : (
                <span style={{ display: "flex", alignItems: "start" }}>
                  {item.value}
                </span>
              )}
            </Form.Item>
          )
        )}
        {/* {data.map((item) => (
          <Form.Item
            colon={false}
            labelCol={{ span: 6, style: { display: "flex" } }} // Set the label column span to 8
            style={{
              padding: "4px 8px",
              borderBottom: "solid #ccc 0.2px",
              marginBottom: "0px",
            }}
            key={item.key}
            label={item.name}>
            {isEditable ? (
              item.isEditable ? (
                <Input
                  style={{ width: "100%" }}
                  value={item.infor}
                  onChange={(e) =>
                    handleInputChange(e.target.value, item.key, "infor")
                  }
                />
              ) : (
                <Input
                  style={{ width: "100%" }}
                  value={item.infor}
                  disabled={true}
                />
              )
            ) : (
              <span style={{ display: "flex", alignItems: "start" }}>
                {item.infor}
              </span>
            )}
          </Form.Item>
        ))} */}
      </Form>

      {/* <Table
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={false}
        showHeader={false}
      />{" "} */}
      {/* 
<Form>
      {formItems.map((item) => (
        <Form.Item label={item.label} key={item.label}>
          <Input
              style={{ width: "100%" }}
              value={item.value}
              // onChange={(e) =>
              //   handleInputChange(e.target.value, "item.key", "infor")
              // }
            />
        </Form.Item>
      ))}
    </Form> */}
    </div>
  );
};

export default Overview;
