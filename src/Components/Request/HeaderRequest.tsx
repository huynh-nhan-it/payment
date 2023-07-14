import React from "react";
import { Layout } from "antd";
import "./request.css";
import { IoIosSettings } from "react-icons/io";
import {
  Menu,
  DatePicker,
  Form,
  Input,
  Button,
  Select,
} from "antd";
import HelpRequest from "./Help";
import Notification from "./Notification";
import Person from "./Person";
import { Link } from "react-router-dom";

const { Header } = Layout;

const HeaderRequest = () => {
  // const menu = (
  //   <Menu style={{ right: "-26px", top: "10px" }}>
  //     <Menu.Item key="form">
  //       <Form style={{ width: "300px" }} className="padding-bottom-12">
  //         <Form.Item label="Filter">
  //           <Button type="primary" htmlType="submit" className="clear-payment">
  //             Clear
  //           </Button>
  //           <Button type="primary" htmlType="submit" className="apply-payment">
  //             Submit
  //           </Button>
  //         </Form.Item>
  //         <Form.Item
  //           labelCol={{ span: 24 }}
  //           label="Purpose"
  //           labelAlign="left"
  //           className="margin-bottom-8">
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           labelCol={{ span: 24 }}
  //           label="Request Code"
  //           labelAlign="left"
  //           className="margin-bottom-8">
  //           <Input />
  //         </Form.Item>
  //         <Form.Item
  //           labelCol={{ span: 24 }}
  //           label="Created"
  //           labelAlign="left"
  //           className="margin-bottom-8">
  //           <DatePicker className="width-100 margin-bottom-8" />
  //           <DatePicker className="width-100" />
  //         </Form.Item>
  //         <Form.Item
  //           label="Select"
  //           labelCol={{ span: 24 }}
  //           className="margin-bottom-8">
  //           <Select>
  //             <Select.Option value="demo">Demo</Select.Option>
  //             <Select.Option value="demo">Demo1</Select.Option>
  //           </Select>
  //         </Form.Item>
  //         <Form.Item
  //           label="Select"
  //           labelCol={{ span: 24 }}
  //           className="margin-bottom-8">
  //           <Select>
  //             <Select.Option value="demo">Demo</Select.Option>
  //             <Select.Option value="demo">Demo1</Select.Option>
  //           </Select>
  //         </Form.Item>
  //       </Form>
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <div>
      <Header
        className="header-request"
        style={{
          backgroundColor: "#167c82",
          display: "flex",
          alignItems: "center",
        }}>
        <div className="opus-logo-name">
          <div className="opus-logo">
            <Link to="/">
              <img
                src="https://o365.vn/wp-content/uploads/logo_w.png"
                style={{ width: "50px", height: "30px" }}
              />
            </Link>
          </div>
          <Link to="/">
            <div className="company-name"> Opus Solution</div>
          </Link>
          <div className="eOffice"> eOffice </div>
        </div>
        <div className="right-request">
          <div className="help-request">
            <HelpRequest />
          </div>
          <div className="notification-request">
            <Notification />
          </div>
          <div className="setting-request">
            <IoIosSettings />
          </div>
          <div className="person-request">
            <Person />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default HeaderRequest;
