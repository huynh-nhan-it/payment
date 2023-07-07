import React from "react";
import { Layout } from "antd";

import {
  Space,
  Menu,
  DatePicker,
  Form,
  Input,
  Dropdown,
  Button,
  Switch,
  Select,
} from "antd";
import { IoReturnDownBackSharp } from "react-icons/io5";
const { Header } = Layout;

const HeaderEmployee: React.FC = () => {
  

  return (
    <Header
      className="header-employee"
      style={{
        display:"flex",
        backgroundColor: "#F5F6FA",
        alignItems: "center",
      }}>
       <IoReturnDownBackSharp/> 
       <div className="return-employee">Return</div>
    </Header>
  );
};

export default HeaderEmployee;
