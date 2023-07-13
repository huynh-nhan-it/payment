// import React from "react";
// import HeaderEmployee from "./Header";
// import { TbUserEdit } from "react-icons/tb";
// import "./employee.css";
// import { Breakpoint, Table } from "antd";
// import type { ColumnsType } from "antd/es/table";

// const Properties = () => {
//   interface DataType {
//     key: React.Key;
//     name: string;
//     infor: string;
//   }

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       responsive: ['lg'],
//     },
//     {
//       title: "Infor",
//       dataIndex: "infor",
//       responsive: ['sm'],
//     }
   
//   ];

//   const data: DataType[] = [
//     {
//       key: "1",
//       name: "Login",
//       infor: "bangnm@o365.vn",
//     },
//     {
//       key: "2",
//       name: "Email",
//       infor: "bangnm@o365.vn"
//     },
//     {
//       key: "3",
//       name: "Employee number",
//       infor: ""
//     },
//     {
//       key: "4",
//       name: "First name",
//       infor: "Bang"
//     },
//     {
//       key: "5",
//       name: "Last name",
//       infor: "Nguyen Minh"
//     },
//     {
//       key: "6",
//       name: "Sex",
//       infor: ""
//     },
//   ];
//   return (
//     <div>
//       <Table columns={columns} dataSource={data} size="middle" showHeader={false} />{" "}
//     </div>
//   );
// };

// export default Properties;
import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';

interface RowData {
  key: string;
  name: string;
  age: number;
  email: string;
}

const Properties: React.FC = () => {
  const initialData: RowData[] = [
    { key: '1', name: 'John Doe', age: 30, email: 'john@example.com' },
    // other data rows
  ];

  const [data, setData] = useState<RowData[]>(initialData);
  const [editable, setEditable] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: RowData) =>
        editable ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e.target.value, record.key, 'name')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: number, record: RowData) =>
        editable ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e.target.value, record.key, 'age')}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string, record: RowData) =>
        editable ? (
          <Input
            value={text}
            onChange={(e) => handleInputChange(e.target.value, record.key, 'email')}
          />
        ) : (
          text
        ),
    },
  ];

  const handleInputChange = (value: string | number, key: string, dataIndex: keyof RowData) => {
    const updatedData = data.map((row) => {
      if (row.key === key) {
        return { ...row, [dataIndex]: value };
      }
      return row;
    });

    setData(updatedData);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    // Perform save logic here with the updated data
    console.log('Saved data:', data);
  };

  return (
    <div>
      <Button onClick={handleEdit}>Edit Table</Button>
      <Table dataSource={data} columns={columns} pagination={false} />
      {editable && <Button onClick={handleSave}>Save</Button>}
    </div>
  );
};

export default Properties;
