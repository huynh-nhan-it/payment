import { Space, Table, Tag } from "antd";
import jsonData from "/Users/hongnguyen/Documents/Giang/opus/payment/src/Components/Request/request.json";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

interface PaymentRequestList {
  requestCode: string;
  purpose: string;
  createdBy: string;
  createdDate: string;
  status: string;
}

const initialDataList: PaymentRequestList[] = jsonData.PaymentRequestList;

const Payment: React.FC = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
  };
  const columns: ColumnsType<PaymentRequestList> = [
    {
      title: "Mã yêu cầu",
      dataIndex: "requestCode",
      key: "requestCode",
    },
    {
      title: "Mục đích",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Tạo bởi",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Ngày tạo",
      key: "createdDate",
      dataIndex: "createdDate",
      render: (text: string, record: PaymentRequestList) => {
        const formattedDate = formatDate(text);
        return (
          <span
            style={{
              padding: "6px",
              color: "#fff",
              backgroundColor:
                record.status === "Approved" ? "#4BA747" : "#2F85EF",
            }}>
            {formattedDate}
          </span>
        );
      },
    },
  ];

  const [selectedRequestCode, setSelectedRequestCode] = useState<string | null>(null);

  const handleRowClick = (requestCode: string) => {
    // setSelectedRequestCode(requestCode);
    console.log(requestCode);
  };
  const [dataList, setDataList] = useState(initialDataList);
  console.log(dataList);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataList}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.requestCode),
        })}
      />
    </div>
  );
};
export default Payment;
