import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import axios from "axios";
import request from "../../../../../Services/User/getAccount";

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
interface TableDetailRequest {
  id: string;
  invDate: string;
  paymentContent: string;
  amount: number;
  invNo: number;
  industry: string;
  departmentOnTable: string;
  note: string;
}

interface Approver {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
}

interface PaymentRequest {
  requestCode: string;
  userName: string;
  createAt: string;
  status: string;
  purpose: string;
  department: string;
  paymentFor: string;
  supplier: string;
  currency: string;
  poNumber: number;
  tableDetailRequest: TableDetailRequest[];
  method: string;
  approverIds: Approver[];
}

const ViewTable: React.FC = () => {
  const [detailTable, setDetailTable] = useState<PaymentRequest | null>(null);
  const { requestCode } = useParams();
  useEffect(() => {
    const getDetailRequest = async () => {
      const endpoint = "/DetailRequest/" + requestCode;
      const response = await request.get(endpoint).then((res) => {
        // console.log(res.data);
        setDetailTable(res.data);
      });
    };
    getDetailRequest();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      key: "id",
      title: <span style={{ color: "#A3A6B4" }}>Inv/Rec date</span>,
      align: "center",
      dataIndex: "id",
    },
    {
      key: "invDate",
      title: <span style={{ color: "#A3A6B4" }}>Inv/Rec date</span>,
      align: "center",
      dataIndex: "invDate",
    },
    {
      key: "paymentContent",
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Payment content</span>,
      dataIndex: "paymentContent",
    },
    {
      key: "amount",
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Amount</span>,
      dataIndex: "amount",
    },
    {
      key: "invNo",
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Invoice/Rec No</span>,
      dataIndex: "invNo",
    },
    {
      key: "industry",
      align: "center",
      title: (
        <span style={{ color: "#A3A6B4" }}> Department bear the cost</span>
      ),
      dataIndex: "industry",
    },
    {
      key: "departmentOnTable",
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>DepartmentOntable</span>,
      dataIndex: "departmentOnTable",
    },
    {
      key: "note",
      align: "center",
      title: <span style={{ color: "#A3A6B4" }}>Note</span>,
      dataIndex: "note",
    },
  ];

  // console.log(requestCode);

  // const tb = detailTable.map(dt);
  const data = detailTable?.tableDetailRequest;

  // console.log(data[0]);
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
    </>
  );
};
export default ViewTable;
