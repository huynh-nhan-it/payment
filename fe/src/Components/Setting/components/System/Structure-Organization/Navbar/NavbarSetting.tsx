import { Menu, Layout, MenuProps } from "antd";
import React from "react";
import { BsFolder2Open } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { Input } from "antd";
import { AiTwotoneSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
  getItem("Setting", "1", <AiTwotoneSetting />),
];
const NavbarSetting: React.FC = () => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log('click ', e.key);
    navigate('/setting')
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
export default NavbarSetting;
