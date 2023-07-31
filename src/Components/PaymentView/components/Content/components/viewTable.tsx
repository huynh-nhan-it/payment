import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { format } from 'date-fns';

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


interface IViewTable {
  detailTables: TableDetailRequest[] | undefined;
}

const ViewTable: React.FC<IViewTable> = ({detailTables}) => {
  const [data, setData] = useState<TableDetailRequest[] | undefined>();
  useEffect(() => {
    let dataTb = detailTables?.map((detail) => {
      return {
        id: detail.id,
        invDate: format(new Date(detail.invDate), 'dd/MM/yyyy'),
        paymentContent: detail.paymentContent,
        amount: detail.amount,
        invNo: detail.invNo,
        industry: detail.industry,
        departmentOnTable: detail.departmentOnTable,
        note: detail.note
      };
    });
    setData(dataTb);
  }, [detailTables]);
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
