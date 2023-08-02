import { Menu, MenuProps } from "antd";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";

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

