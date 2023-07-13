import React from "react";
import HeaderEmployee from "./Header";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { Breakpoint, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const Overview = () => {
  interface DataType {
    key: React.Key;
    name: string;
    infor: string;
  }

  

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      responsive: ['lg'],
    },
    {
      title: "Infor",
      dataIndex: "infor",
      responsive: ['sm'],
    }
   
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Login",
      infor: "bangnm@o365.vn",
    },
    {
      key: "2",
      name: "Email",
      infor: "bangnm@o365.vn"
    },
    {
      key: "3",
      name: "Employee number",
      infor: ""
    },
    {
      key: "4",
      name: "First name",
      infor: "Bang"
    },
    {
      key: "5",
      name: "Last name",
      infor: "Nguyen Minh"
    },
    {
      key: "6",
      name: "Sex",
      infor: ""
    },
    {
      key: "7",
      name: "Login",
      infor: "bangnm@o365.vn",
    },
    {
      key: "8",
      name: "Email",
      infor: "bangnm@o365.vn"
    },
    {
      key: "3",
      name: "Employee number",
      infor: ""
    },
    {
      key: "9",
      name: "First name",
      infor: "Bang"
    },
    {
      key: "10",
      name: "Last name",
      infor: "Nguyen Minh"
    },
    {
      key: "11",
      name: "Sex",
      infor: ""
    },
  ];

  const transformedData = data.map((row) => ({
    ...row,
    key: row.key,
    // Replace the page number column with "Ant d"
    pageNumber: 'Ant d',
  }));
  return (
    <div>
      <Table columns={columns} dataSource={transformedData} size="middle" pagination={false} showHeader={false} />{" "}
    </div>
  );
};

export default Overview;
