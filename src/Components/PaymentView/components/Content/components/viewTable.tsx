// import React from 'react';
// import { Table } from 'antd';
// import type { ColumnsType, TableProps } from 'antd/es/table';

// interface DataType {
//   key: React.Key;
//   Inv: string;
//   'payment-content': string;
//   Amount: number;
//   Invoice: number;
//   'Cost-bearing': string;
//   'Department-bear': string;
//   Note: React.ReactNode
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: <span style={{ color: '#A3A6B4' }}>Inv/Rec date</span>,
//     align: 'center',
//     dataIndex: 'Inv',
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}>Payment content</span>,
//     dataIndex: 'payment-content',
    
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}>Amount</span>,
//     dataIndex: 'Amount',
   
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}>Invoice/Rec No</span>,
//     dataIndex: 'Invoice',
    
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}> Cost-bearing Industry</span>,
//     dataIndex: 'Cost-bearing',
    
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}> Department bear the cost</span> ,
//     dataIndex: 'Department-bear',
    
//   },
//   {
//     align: 'center',
//     title: <span style={{ color: '#A3A6B4' }}>Note</span>,
//     dataIndex: 'Note',
    
//   },
// ];

// const data: DataType[] = [
//   {
//     key: '1',
//     Inv:  new Date(2023, 7, 5).toISOString(),
//     'payment-content': 'Mua nhà',
//   Amount: 10000000000,
//   Invoice: 123456,
//   'Cost-bearing': 'IT/technical',
//   'Department-bear': 'FL01 - Lab - MSI',
//   Note: ''
//   },
//   {
//     key: '2',
//     Inv:  new Date(2023, 7, 5).toISOString(),
//     'payment-content': 'Mua nhà',
//   Amount: 10000000000,
//   Invoice: 123456,
//   'Cost-bearing': 'IT/technical',
//   'Department-bear': 'FL01 - Lab - MSI',
//   Note: ''
//   },
//   {
//     key: '3',
//     Inv:  new Date(2023, 7, 5).toISOString(),
//     'payment-content': 'Mua nhà',
//   Amount: 10000000000,
//   Invoice: 123456,
//   'Cost-bearing': 'IT/technical',
//   'Department-bear': 'FL01 - Lab - MSI',
//   Note: ''
//   },
//   {
//     key: '4',
//     Inv:  new Date(2023, 7, 5).toISOString(),
//     'payment-content': 'Mua nhà',
//   Amount: 10000000000,
//   Invoice: 123456,
//   'Cost-bearing': 'IT/technical',
//   'Department-bear': 'FL01 - Lab - MSI',
//   Note: ''
//   },
// ];

// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

// const ViewTable: React.FC = () => <Table columns={columns} pagination={false} scroll={{x: 'max-content'}} dataSource={data} onChange={onChange} />;

// export default ViewTable;

import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useParams } from "react-router-dom";

const PaymentRequestDetail = [
  {
    requestCode: "2023OPS-PAY-000001",
    userName: "Emily Williams",
    createAt: "2023-07-13T17:11:59.2257238",
    status: "Approving",
    purpose: "Mua chung cư",
    department: "Marketing",
    paymentFor: "Dream Home Palace",
    supplier: "1041171-Công Ty TNHH Opus Solution",
    currency: "USD",
    poNumber: 50,
    tableDetailRequest: [
      {
        id: "e0ccbf32-ee25-44df-5463-08db83899822",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello TDTU",
        amount: 30,
        invNo: 2,
        industry: "string",
        departmentOnTable: "TabCorp",
        note: "Một có Note",
      },
      {
        id: "d0cdf588-e534-48d5-5464-08db83899822",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello Opus",
        amount: 40,
        invNo: 3,
        industry: "string",
        departmentOnTable: "CotecCons",
        note: "Hai có Note",
      },
    ],
    method: "Cash",
    approverIds: [
      {
        id: "9f86a3a1-0807-4fe2-9e52-3857f473a150",
        fullName: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        jobTitle: "Scrum Master",
      },
      {
        id: "f811e1aa-5127-4635-9299-a03f4c1df306",
        fullName: "Daniel Wilson",
        email: "daniel.wilson@example.com",
        jobTitle: "Database",
      },
    ],
  },
  {
    requestCode: "2023OPS-PAY-000002",
    userName: "Emily Williams",
    createAt: "2023-07-13T17:12:38.4441154",
    status: "Approved",
    purpose: "Mua Đất",
    department: "Human Resource",
    paymentFor: "Mua đất ở Q8",
    supplier: "1041171-Công Ty TNHH Opus Solution",
    currency: "VND",
    poNumber: 10,
    tableDetailRequest: [
      {
        id: "4835a745-92f7-4649-b2d2-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello World",
        amount: 20,
        invNo: 1,
        industry: "Bất Động Sản",
        departmentOnTable: "WordPress",
        note: "Không có Note",
      },
      {
        id: "3e46c05e-bbb6-4151-b2d3-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello TDTU",
        amount: 30,
        invNo: 2,
        industry: "string",
        departmentOnTable: "TabCorp",
        note: "Một có Note",
      },
      {
        id: "e7b89d34-03a1-452c-b2d4-08db8389af7f",
        invDate: "2023-07-12T06:03:13.988",
        paymentContent: "Hello Opus",
        amount: 40,
        invNo: 3,
        industry: "string",
        departmentOnTable: "CotecCons",
        note: "Hai có Note",
      },
    ],
    method: "Cash",
    approverIds: [
      {
        id: "9f86a3a1-0807-4fe2-9e52-3857f473a150",
        fullName: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        jobTitle: "Scrum Master",
      },
      {
        id: "65636075-b136-48df-8067-6d67fdf95d8e",
        fullName: "John Doe",
        email: "john.doe@example.com",
        jobTitle: "Tester",
      },
      {
        id: "f811e1aa-5127-4635-9299-a03f4c1df306",
        fullName: "Daniel Wilson",
        email: "daniel.wilson@example.com",
        jobTitle: "Database",
      },
    ],
  },
];
interface DataType {
  id: string;
  invDate: string;
  paymentContent: string;
  amount: number;
  invNo: number;
  industry: string;
  departmentOnTable: string;
  note: string;
}


const ViewTable: React.FC = () => {

  const {requestCode} = useParams()
  const columns: ColumnsType<DataType> = [
    {
      key: 'id',
      title: <span style={{ color: "#A3A6B4" }}>Inv/Rec date</span>,
      align: "center",
      dataIndex: "id",
    },
    {
      key: 'invDate',
      title: <span style={{ color: "#A3A6B4" }}>Inv/Rec date</span>,
      align: "center",
      dataIndex: "invDate",
    },
    {
      key: 'paymentContent',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Payment content</span>,
      dataIndex: "paymentContent",
    },
    {
      key: 'amount',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Amount</span>,
      dataIndex: "amount",
    },
    {
      key: 'invNo',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Invoice/Rec No</span>,
      dataIndex: "invNo",
    },
    {
      key:'industry',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}> Department bear the cost</span>,
      dataIndex: "industry",
    },
    {
      key:'departmentOnTable',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>DepartmentOntable</span>,
      dataIndex: "departmentOnTable",
    },
    {
      key:'note',
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Note</span>,
      dataIndex: "note",
    },
  ];

  const paymentDetail = PaymentRequestDetail.filter((pr) => (
    pr.requestCode === requestCode
  ));

  // console.log(requestCode);

  const tb = paymentDetail.map(pd => pd.tableDetailRequest);
  const data = tb.map(item=>item);
// console.log(data[0]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data[0]}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </>
  );
};
export default ViewTable;
