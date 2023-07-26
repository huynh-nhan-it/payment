import { Menu, Layout, MenuProps } from "antd";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { Input } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Search } = Input;

const { Content, Sider } = Layout;

// const items = [
//   {
//     key: "1",
//     label: `Requests`,
//     icon: <BsFolder2Open />,
//     children: [
//       {
//         key: "1-1",
//         label: `All Requests`,
//       },
//       {
//         key: "1-2",
//         label: `Sent to me`,
//       },
//       {
//         key: "1-3",
//         label: `Sent to others`,
//       },
//       {
//         key: "1-4",
//         label: `Shared with me`,
//       },
//     ],
//   },
//   {
//     key: "2",
//     label: `Status`,
//     icon: <BiBarChartAlt />,
//     children: [
//       {
//         key: "2-1",
//         label: `Draft`,
//       },
//       {
//         key: "2-2",
//         label: `Approving`,
//       },
//       {
//         key: "2-3",
//         label: `Approved`,
//       },
//       {
//         key: "2-4",
//         label: `Rejected`,
//       },
//     ],
//   },
//   {
//     key: "3",
//     icon: <BiBarChartAlt />,
//     label: `Reports`,
//     children: [],
//   },
// ];


type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Requests", "1", <BsFolder2Open />, [
    getItem("All Requests", "1-1"),
    getItem("Sent to me", "1-2"),
    getItem("Sent to others", "1-3"),
    getItem("Shared with me", "1-4"),
  ]),
  getItem("Status", "2", <BiBarChartAlt />, [
    getItem("Draft", "2-1"),
    getItem("Approving", "2-2"),
    getItem("Approved", "2-3"),
    getItem("Rejected", "2-4"),
  ]),
  getItem("Reports", "11", <BiBarChartAlt />),
];
// const items: MenuItem[] = [
//   getItem("Requests", "1", <BsFolder2Open />, [
//     getItem("All Requests", "3"),
//     getItem("Sent to me", "4"),
//     getItem("Sent to others", "5"),
//     getItem("Shared with me", "6"),
//   ]),
//   getItem("Status", "2", <BiBarChartAlt />, [
//     getItem("Draft", "7"),
//     getItem("Approving", "8"),
//     getItem("Approved", "9"),
//     getItem("Rejected", "10"),
//   ]),
//   getItem("Reports", "11", <BiBarChartAlt />),
// ];

// const item3 = items.map((item) => {
//   return {
//     key: item.key,
//     label: item.label,
//     icon: item.icon,
//     children: item.children.map((child, j) => {
//       return {
//         key: child.key,
//         label: child.label,
//       };
//     }),
//   };
// });

const NavbarRequest: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e.key);
    if(e.key==='1-1'){
      console.log("object");
      // setData(dataAll)
    }else if(e.key==='1-2'){
      // setData(dataSendToMe)
    }
  };
  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={items}></Menu>
  );
};
export default NavbarRequest;


// import { Menu, MenuProps } from "antd";
// import React, { useEffect, useState } from "react";
// import { BsFolder2Open } from "react-icons/bs";
// import { BiBarChartAlt } from "react-icons/bi";
// import { ConnectedProps, connect } from "react-redux";
// import * as XLSX from "xlsx";
// import { RootState } from "./component/Payment/store";

// import { useNavigate } from "react-router-dom";
// import { ColumnsType } from "antd/es/table";
// import request from "../../Services/User/getAccount";

// interface PaymentRequestList {
//   requestCode: string;
//   purpose: string;
//   createdBy: string;
//   createdDate: string;
//   status: string;
// }

// interface DataListProps extends ConnectedProps<typeof connector> {
//   // Thêm các props khác nếu cần
// }

// // const items = [
// //   {
// //     key: "1",
// //     label: `Requests`,
// //     icon: <BsFolder2Open />,
// //     children: [
// //       {
// //         key: "1-1",
// //         label: `All Requests`,
// //       },
// //       {
// //         key: "1-2",
// //         label: `Sent to me`,
// //       },
// //       {
// //         key: "1-3",
// //         label: `Sent to others`,
// //       },
// //       {
// //         key: "1-4",
// //         label: `Shared with me`,
// //       },
// //     ],
// //   },
// //   {
// //     key: "2",
// //     label: `Status`,
// //     icon: <BiBarChartAlt />,
// //     children: [
// //       {
// //         key: "2-1",
// //         label: `Draft`,
// //       },
// //       {
// //         key: "2-2",
// //         label: `Approving`,
// //       },
// //       {
// //         key: "2-3",
// //         label: `Approved`,
// //       },
// //       {
// //         key: "2-4",
// //         label: `Rejected`,
// //       },
// //     ],
// //   },
// //   {
// //     key: "3",
// //     icon: <BiBarChartAlt />,
// //     label: `Reports`,
// //     children: [],
// //   },
// // ];

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem("Requests", "1", <BsFolder2Open />, [
//     getItem("All Requests", "1-1"),
//     getItem("Sent to me", "1-2"),
//     getItem("Sent to others", "1-3"),
//     getItem("Shared with me", "1-4"),
//   ]),
//   getItem("Status", "2", <BiBarChartAlt />, [
//     getItem("Draft", "2-1"),
//     getItem("Approving", "2-2"),
//     getItem("Approved", "2-3"),
//     getItem("Rejected", "2-4"),
//   ]),
//   getItem("Reports", "11", <BiBarChartAlt />),
// ];

// // const item3 = items.map((item) => {
// //   return {
// //     key: item.key,
// //     label: item.label,
// //     icon: item.icon,
// //     children: item.children.map((child, j) => {
// //       return {
// //         key: child.key,
// //         label: child.label,
// //       };
// //     }),
// //   };
// // });

// const NavbarRequest: React.FC <DataListProps> = ({ filteredData })=> {

//   const [dataAll, setDataAll] = useState([])
//   const [dataSendToMe, setDataSendToMe] = useState([])
//   const [data, setData] = useState([]);
//   const [purpose, setPurpose] = useState("");
//   const [requestCode, setRequestCode] = useState("");
//   const [createdDateFrom, setCreatedDateFrom] = useState("");
//   const [createDateTo, setCreateDateTo] = useState("");
//   const [createdBy, setCreatedBy] = useState("");
//   const [status, setStatus] = useState("");
//   // console.log(filteredData);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setPurpose(filteredData.purpose);
//     setRequestCode(filteredData.requestCode);
//     setCreatedDateFrom(filteredData.createdDateFrom);
//     setCreateDateTo(filteredData.createdDateTo);
//     setCreatedBy(filteredData.createdBy);
//     setStatus(filteredData.status);
//   });
//   useEffect(() => {
//     const getPaymentList = async () => {
//         const endpoint = `PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}&page=${currentPage}`;
//         const response = await request.get(endpoint).then((res) => {
//           // console.log(res.data);
//             setDataAll(res.data);
//         }
//         );
//     }

//     const getPaymentSendToMe = async () => {
//       const endpoint = `PaymentRequest/?Purpose=${purpose}&RequestCode=${requestCode}&from=${createdDateFrom}&to=${createDateTo}&Creater=${createdBy}&Status=${status}&page=${currentPage}`;
//       const response = await request.get(endpoint).then((res) => {
//         // console.log(res.data);
//           setDataAll(res.data);
//       }
//       );
//   }
//     getPaymentList();

// }, [])
  
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day}/${month < 10 ? "0" + month : month}/${year}`;
//   };
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
//           Approved: "#4BA747",
//           Draft: "#2F85EF",
//           Rejected: "#FF0000",
//           Approving: "#FFA500",
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

//   const handleRowClick = (requestCode: string) => {
//     navigate(`/request/payment/view/${requestCode}`);
//   };

//   const onClick: MenuProps['onClick'] = (e) => {
//     // console.log('click ', e.key);
//     if(e.key==='1-1'){
//       setData(dataAll)
//     }else if(e.key==='1-2'){
//       setData(dataSendToMe)
//     }
//   };
//   return (
//     <Menu
//       mode="inline"
//       onClick={onClick}
//       defaultSelectedKeys={["1"]}
//       defaultOpenKeys={["sub1"]}
//       items={items}></Menu>
//   );
// };


// // Hàm mapStateToProps để map state từ Redux store thành props của component
// const mapStateToProps = (state: RootState) => {
//   return {
//     filteredData: state.filter,
//   };
// };

// const mapDispatchToProps = {};

// const connector = connect(mapStateToProps, mapDispatchToProps);

// export default connect(mapStateToProps, mapDispatchToProps)(NavbarRequest);
// // export default NavbarRequest;
