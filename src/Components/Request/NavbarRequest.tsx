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
    getItem("All Requests", "3"),
    getItem("Sent to me", "4"),
    getItem("Sent to others", "5"),
    getItem("Shared with me", "6"),
  ]),
  getItem("Status", "2", <BiBarChartAlt />, [
    getItem("Draft", "7"),
    getItem("Approving", "8"),
    getItem("Approved", "9"),
    getItem("Rejected", "10"),
  ]),
  getItem("Reports", "11", <BiBarChartAlt />),
];

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
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={items}></Menu>
  );
};
export default NavbarRequest;
