import { Space, Table, Tag } from "antd";
// import jsonData from "/Users/hongnguyen/Documents/Giang/opus/payment/src/Components/Request/request.json";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "./store";

interface PaymentRequestList {
  requestCode: string;
  purpose: string;
  createdBy: string;
  createdDate: string;
  status: string;
}
interface DataListProps extends ConnectedProps<typeof connector> {
  // Thêm các props khác nếu cần
}
const Payment: React.FC<DataListProps> = ({ filteredData }) => {
  // `/request/get-all?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=1&limit=20`
  const [data, setData] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [requestCode, setRequestCode] = useState("");
  const [createdDateFrom, setCreatedDateFrom] = useState("");
  const [createDateTo, setCreateDateTo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false)
  // console.log(filteredData);

// const initialDataList: PaymentRequestList[] = jsonData.PaymentRequestList;
const initialDataList: PaymentRequestList[] = [];

  // console.log(filteredData.createdDateFrom);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/api/PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
  };
  const navigate = useNavigate();

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

  const handleRowClick = (requestCode: string) => {
    navigate(`/request/payment/view/${requestCode}`);
  };
  // const {requestCode} = useParams();
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataList}
        onRow={(record: any) => ({
          onClick: () => handleRowClick(record.requestCode),
        })}
        rowKey="requestCode"
      />
    </div>
  );
};

// Hàm mapStateToProps để map state từ Redux store thành props của component
const mapStateToProps = (state: RootState) => {
  return {
    filteredData: state.filter,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Payment);
