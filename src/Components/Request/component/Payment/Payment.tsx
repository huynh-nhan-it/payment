import { Table } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "./store";
import HeaderPayment from "./Header";
import * as XLSX from "xlsx";

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
  // console.log(filteredData);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect((data) => {
  //   fetchData();
  // }, [data]);

  useEffect(() => {
    setPurpose(filteredData.purpose);
    setRequestCode(filteredData.requestCode);
    setCreatedDateFrom(filteredData.createdDateFrom);
    setCreateDateTo(filteredData.createdDateTo);
    setCreatedBy(filteredData.createdBy);
    setStatus(filteredData.status);
  });

  // const fetchData =() => {
  //   axios
  //   .get(
  //     `http://localhost:5005/api/PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}&page=${page}`
  //   )
  //     // .get(`http://localhost:5005/api/PaymentRequest/?page=${page}`)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  console.log(data);
  // console.log(filteredData.createdDateFrom);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5005/api/PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}&page=${currentPage}`
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
        const statusColors: any = {
          Approved: "#4BA747",
          Draft: "#2F85EF",
          Rejected: "#FF0000",
          Approving: "#FFA500",
        };
        const backgroundColor = statusColors[record.status] || "#000000"; // Default color if status not found

        return (
          <span
            style={{
              padding: "6px",
              color: "#fff",
              backgroundColor: backgroundColor,
            }}>
            {formattedDate}
          </span>
        );
      },
    },
  ];

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleRowClick = (requestCode: string) => {
    navigate(`/request/payment/view/${requestCode}`);
  };
  return (
    <>
      <HeaderPayment exportData={handleExportExcel}></HeaderPayment>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClick(record.requestCode),
        })}
        rowKey="requestCode"
        pagination={{
          pageSize: 20,
          current: currentPage,
          total: 50, // Replace with the total number of records from the API
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: "max-content" }}
      />
    </>
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
