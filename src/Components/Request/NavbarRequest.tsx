import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { BsFolder2Open } from "react-icons/bs";
import { BiBarChartAlt } from "react-icons/bi";
import { applyNavbar } from "./component/actions/actions";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../PaymentRequest/Store";
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
  getItem("Reports", "3", <BiBarChartAlt />),
];




interface NavbarProps extends ConnectedProps<typeof connector> {}
const NavbarRequest: React.FC<NavbarProps> = ({applyNavbar}) => {
  const [navbarKey, setNavbarKey] = useState('')
  const onClick: MenuProps['onClick'] = (e) => {
    // setNavbarKey()
    applyNavbar(e.key)
  };
  // console.log(navbarKey);
  return (
    <Menu
      onClick={onClick}
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={items}></Menu>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

// Hàm mapDispatchToProps để map các action creators thành props của component
const mapDispatchToProps = {
  applyNavbar
};

// Kết nối component với Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NavbarRequest);


