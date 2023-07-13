import { Menu, Layout, theme } from "antd";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { BsFolder2Open } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { Input, Space } from "antd";
import { Link } from "react-router-dom";
const { Search } = Input;

const { Content, Sider } = Layout;

const items = [
  {
    key: "1",
    label: `Requests`,
    icon: <BsFolder2Open />,
    children: [
      {
        key: 1,
        label: `All Requests`,
      },
      {
        key: 2,
        label: `Sent to me`,
      },
      {
        key: 3,
        label: `Sent to others`,
      },
      {
        key: 4,
        label: `Shared with me`,
      },
    ],
  },
  {
    key: "2",
    label: `Status`,
    icon: <BiBarChartAlt />,
    children: [
      {
        key: 5,
        label: `Draft`,
      },
      {
        key: 6,
        label: `Approving`,
      },
      {
        key: 7,
        label: `Approved`,
      },
      {
        key: 8,
        label: `Rejected`,
      },
    ],
  },
  {
    key: "3",
    icon: <BiBarChartAlt />,
    label: `Reports`,
    children: [],
  },
];

const item3 = items.map((item) => {
  return {
    key: item.key,
    label: item.label,
    icon: item.icon,
    children: item.children.map((child, j) => {
      return {
        key: child.key,
        label: child.label,
      };
    }),
  };
});

const handleClick=() =>{
  console.log("test");
}
const NavbarRequest: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={item3}
    ><Link onClick={handleClick} to="/test"></Link></Menu>
  );
};
export default NavbarRequest;
