// import { Table } from "antd";
// import { useState } from "react";
// import { ColumnsType } from "antd/es/table";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect } from "react";
// import axios from "axios";
// import { ConnectedProps, connect } from "react-redux";
// import { RootState } from "../store/store";
// import HeaderPayment from "./Header";
// import * as XLSX from "xlsx";
// import request from "../../../../Services/User/getAccount";
// import { formatDate } from "../../../../Utils/formatDate";

// interface PaymentRequestList {
//   id: string;
//   requestCode: string;
//   purpose: string;
//   createdBy: string;
//   createdDate: string;
//   status: string;
// }

// interface DataListProps extends ConnectedProps<typeof connector> {
// }
// const Payment: React.FC<DataListProps> = ({ filteredData, searchData, navbarData }) => {
//   const [initialData, setInitialData] = useState<PaymentRequestList[]>([]);
//   const [dataSendToMe, setDataSendToMe] = useState<PaymentRequestList[]>([]);
//   const [dataSendToOther, setDataSendToOther] = useState<PaymentRequestList[]>([]);
//   const [dataShareWithMe, setDataShareWithMe] = useState<PaymentRequestList[]>([]);
//   const [data, setData] = useState<PaymentRequestList[]>(initialData);
//   const [purpose, setPurpose] = useState("");
//   const [requestCode, setRequestCode] = useState("");
//   const [createdDateFrom, setCreatedDateFrom] = useState("");
//   const [createDateTo, setCreateDateTo] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [status, setStatus] = useState("");
//   const [totalPage, setTotalPage] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setPurpose(filteredData.purpose);
//     setRequestCode(filteredData.requestCode);
//     setCreatedDateFrom(filteredData.createdDateFrom);
//     setCreateDateTo(filteredData.createdDateTo);
//     setCreatedBy(filteredData.createdBy);
//     setStatus(filteredData.status);
//   });

//   const id = localStorage.getItem('id')
//   useEffect(() => {
//     const getPaymentList = async () => {
//       const endpoint = `PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}`;
//       const response = await request.get(endpoint).then((res) => {
//         setTotalPage(res.data.length)
//         setData(res.data);
//         setInitialData(res.data)
//       });
//     };

//     const getSendToMe = async () => {
//       const endpoint = `PaymentRequest/send-to-me?myId=${id}`;
//       const response = await request.get(endpoint).then((res) => {
//         setDataSendToMe(res.data)
//       });
//     };

//     const getSendToOther = async () => {
//       const endpoint = `PaymentRequest/send-to-others?myId=${id}`;
//       const response = await request.get(endpoint).then((res) => {
//         setDataSendToOther(res.data)
//       });
//     };

//     const getShareWithMe = async () => {
//       const endpoint = `PaymentRequest/shared-with-me?myId=${id}`;
//       const response = await request.get(endpoint).then((res) => {
//         setDataShareWithMe(res.data)
//       });
//     };

//     getSendToMe();
//     getSendToOther();
//     getPaymentList();
//     getShareWithMe();

//   }, [
//     purpose,
//     requestCode,
//     createdDateFrom,
//     createDateTo,
//     createdBy,
//     status,
//   ]);

//   // console.log(navbarData.key);

//   // console.log(totalPage);
//   const handleSetCurrentPage = (page: any) => {
//     // console.log(page);
//     setCurrentPage(page)
//   };

//   useEffect(() => {
//     const dataFilter = initialData?.filter(item => {
//       const searchableFields = ['purpose', 'requestCode', 'createdBy', 'status'];
//       // console.log(item[searchableFields]);
//       console.log(searchableFields);
//       return searchableFields.some(field =>
//         item.purpose.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.requestCode.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.createdBy.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.status.toLowerCase().includes(searchData.keyword.toLowerCase())
//       );
//     });
//     setData(dataFilter);
//   }, [searchData.keyword])

//   useEffect(() => {
//     if (navbarData.key === '1-1') {
//       setData(initialData)
//     }
//     else if (navbarData.key === '1-2') {
//       setData(dataSendToMe)
//     } else if (navbarData.key === '1-3') {
//       setData(dataSendToOther)
//     } else if (navbarData.key === '1-4') {
//       setData(dataShareWithMe)
//     } 
//     else if(navbarData.key==='2-1'){
//       const dataDraft = initialData?.filter(item => {
//         return item.status === 'Draft'
//       })
//       setData(dataDraft)
//     }
//     else if (navbarData.key === '2-2') {
//       const dataApproving = initialData?.filter(item => {
//         return item.status === 'Approving'
//       })
//       setData(dataApproving)
//     }
//     else if (navbarData.key === '2-3') {
//       const dataApproved = initialData?.filter(item => {
//         return item.status === 'Approved'
//       })
//       setData(dataApproved)
//     }
//     else if (navbarData.key === '2-4') {
//       const dataRejected = initialData?.filter(item => {
//         return item.status === 'Rejected'
//       })
//       setData(dataRejected)
//     }


//     // console.log(dataApproving);
//   }, [navbarData.key])

//   const navigate = useNavigate();

//   const columns: ColumnsType<PaymentRequestList> = [
//     {
//       title: "Mã yêu cầu",
//       dataIndex: "requestCode",
//       key: "requestCode",
//     },
//     {
//       title: "Mục đích",
//       dataIndex: "purpose",
//       key: "purpose",
//     },
//     {
//       title: "Tạo bởi",
//       dataIndex: "createdBy",
//       key: "createdBy",
//     },
//     {
//       title: "Ngày tạo",
//       key: "createdDate",
//       dataIndex: "createdDate",
//       render: (text: string, record: PaymentRequestList) => {
//         const formattedDate = formatDate(text);
//         const statusColors: any = {
//           Draft: "#FFA500",
//           Rejected: "#FF0000",
//           Approving: "#2F85EF",
//           Done: '#4BA747'
//         };
//         const backgroundColor = statusColors[record.status] || "#000000"; // Default color if status not found

//         return (
//           <span
//             style={{
//               padding: "6px",
//               color: "#fff",
//               backgroundColor: backgroundColor,
//             }}>
//             {formattedDate}
//           </span>
//         );
//       },
//     },
//   ];

//   const handleExportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     XLSX.writeFile(workbook, "data.xlsx");
//   };

//   // console.log(data);
//   const handleRowClick = (requestCode: string) => {
//     navigate(`/request/payment/view/${requestCode}`);
//   };

//   return (
//     <>
//       <HeaderPayment exportData={handleExportExcel}></HeaderPayment>
//       <Table
//         columns={columns}
//         dataSource={data}
//         onRow={(record) => ({
//           onClick: () => handleRowClick(record.requestCode),
//         })}
//         rowKey="requestCode"
//         // pagination={{
//         //   pageSize:5,
//         //   current: currentPage,
//         //   total: totalPage, // Replace with the total number of records from the API
//         //   onChange: (page) => handleSetCurrentPage(page),
//         // }}
//         scroll={{ x: "max-content" }}
//       />
//     </>
//   );
// };

// // Hàm mapStateToProps để map state từ Redux store thành props của component
// const mapStateToProps = (state: RootState) => {
//   return {
//     filteredData: state.filter,
//     searchData: state.search,
//     navbarData: state.key
//   };
// };

// const mapDispatchToProps = {};

// const connector = connect(mapStateToProps, mapDispatchToProps);

// export default connector(Payment);

import { Table } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../store/store";
import HeaderPayment from "./Header";
import * as XLSX from "xlsx";
import request from "../../../../Services/User/getAccount";
import { formatDate } from "../../../../Utils/formatDate";

interface PaymentRequestList {
  id: string;
  requestCode: string;
  purpose: string;
  createdBy: string;
  createdDate: string;
  status: string;
}

interface DataListProps extends ConnectedProps<typeof connector> {
}
const Payment: React.FC<DataListProps> = ({ filteredData, searchData, navbarData }) => {
  const [initialData, setInitialData] = useState<PaymentRequestList[]>([]);
  const [dataSendToMe, setDataSendToMe] = useState<PaymentRequestList[]>([]);
  const [dataSendToOther, setDataSendToOther] = useState<PaymentRequestList[]>([]);
  const [dataShareWithMe, setDataShareWithMe] = useState<PaymentRequestList[]>([]);
  const [data, setData] = useState<PaymentRequestList[]>(initialData);
  const [purpose, setPurpose] = useState("");
  const [requestCode, setRequestCode] = useState("");
  const [createdDateFrom, setCreatedDateFrom] = useState("");
  const [createDateTo, setCreateDateTo] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPurpose(filteredData.purpose);
    setRequestCode(filteredData.requestCode);
    setCreatedDateFrom(filteredData.createdDateFrom);
    setCreateDateTo(filteredData.createdDateTo);
    setCreatedBy(filteredData.createdBy);
    setStatus(filteredData.status);
  });

  const id = localStorage.getItem('id')
  useEffect(() => {
    const getPaymentList = async () => {
      const endpoint = `PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}`;
      const response = await request.get(endpoint).then((res) => {
        setTotalPage(res.data.length)
        setData(res.data);
        setInitialData(res.data)
      });
    };

    const getSendToMe = async () => {
      const endpoint = `PaymentRequest/send-to-me?myId=${id}`;
      const response = await request.get(endpoint).then((res) => {
        setDataSendToMe(res.data)
      });
    };

    const getSendToOther = async () => {
      const endpoint = `PaymentRequest/send-to-others?myId=${id}`;
      const response = await request.get(endpoint).then((res) => {
        setDataSendToOther(res.data)
      });
    };

    const getShareWithMe = async () => {
      const endpoint = `PaymentRequest/shared-with-me?myId=${id}`;
      const response = await request.get(endpoint).then((res) => {
        setDataShareWithMe(res.data)
      });
    };

    getSendToMe();
    getSendToOther();
    getPaymentList();
    getShareWithMe();

  }, [
    purpose,
    requestCode,
    createdDateFrom,
    createDateTo,
    createdBy,
    status,
  ]);

  // console.log(navbarData.key);

  // console.log(totalPage);
  const handleSetCurrentPage = (page: any) => {
    // console.log(page);
    setCurrentPage(page)
  };

  useEffect(() => {
    const dataFilter = initialData?.filter(item => {
      const searchableFields = ['purpose', 'requestCode', 'createdBy', 'status'];
      // console.log(item[searchableFields]);
      // console.log(item.createdDate);
      return searchableFields.some(field =>
        item.purpose.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.requestCode.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.createdBy.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.status.toLowerCase().includes(searchData.keyword.toLowerCase()) || item.createdDate.includes(searchData.keyword)
      );
    });
    setData(dataFilter);
  }, [searchData.keyword])

  useEffect(() => {
    if (navbarData.key === '1-1') {
      setData(initialData)
    }
    else if (navbarData.key === '1-2') {
      setData(dataSendToMe)
    } else if (navbarData.key === '1-3') {
      setData(dataSendToOther)
    } else if (navbarData.key === '1-4') {
      setData(dataShareWithMe)
    }
    else if (navbarData.key === '2-1') {
      const dataDraft = initialData?.filter(item => {
        return item.status === 'Draft'
      })
      setData(dataDraft)
    }
    else if (navbarData.key === '2-2') {
      const dataApproving = initialData?.filter(item => {
        return item.status === 'Approving'
      })
      setData(dataApproving)
    }
    else if (navbarData.key === '2-3') {
      const dataApproved = initialData?.filter(item => {
        return item.status === 'Approved'
      })
      setData(dataApproved)
    }
    else if (navbarData.key === '2-4') {
      const dataRejected = initialData?.filter(item => {
        return item.status === 'Rejected'
      })
      setData(dataRejected)
    }


    // console.log(dataApproving);
  }, [navbarData.key])

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
          Draft: "#FFA500",
          Rejected: "#FF0000",
          Approving: "#2F85EF",
          Done: '#4BA747'
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

  // console.log(data);
  const handleRowClick = (requestCode: string) => {
    navigate(`/request/payment/view/${requestCode}`);
  };

  return (
    <div>
      <HeaderPayment exportData={handleExportExcel}></HeaderPayment>
      <div className="payment-list">

        <Table
          className="table-payment"
          columns={columns}
          dataSource={data}
          onRow={(record) => ({
            onClick: () => handleRowClick(record.requestCode),
          })}
          rowKey="requestCode"
          // pagination={{
          //   pageSize:5,
          //   current: currentPage,
          //   total: totalPage, // Replace with the total number of records from the API
          //   onChange: (page) => handleSetCurrentPage(page),
          // }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

// Hàm mapStateToProps để map state từ Redux store thành props của component
const mapStateToProps = (state: RootState) => {
  return {
    filteredData: state.filter,
    searchData: state.search,
    navbarData: state.key
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Payment);
