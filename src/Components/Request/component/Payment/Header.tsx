import React from "react";
import { Layout } from "antd";
import { FaFilter } from "react-icons/fa";
import { TbArrowBarToRight } from "react-icons/tb";
import { RiArrowDownSFill } from "react-icons/ri";
import { useState } from "react";
import "./payment.css";

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
const { Header } = Layout;

const HeaderPayment: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Perform desired actions with form values
  };
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
  };

  const menu = (
    <Menu style={{ right: "-26px", top: "10px" }}>
      <Menu.Item key="form">
        <Form
          onFinish={handleSubmit}
          onClick={handleFormClick}
          style={{ width: "300px" }}
          className="padding-bottom-12">
          <Form.Item label="Filter"> 
            <Button type="primary" htmlType="submit" className="clear-payment">
              Clear
            </Button>
            <Button type="primary" htmlType="submit" className="apply-payment">
              Submit
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Purpose"
            labelAlign="left"
            className="margin-bottom-8">
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Request Code"
            labelAlign="left"
            className="margin-bottom-8">
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Created"
            labelAlign="left"
            className="margin-bottom-8">
            <DatePicker className="width-100 margin-bottom-8" />
            <DatePicker className="width-100" />
          </Form.Item>
          <Form.Item label="Select"  labelCol={{ span: 24 }} className="margin-bottom-8">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo">Demo1</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Select" labelCol={{ span: 24 }} className="margin-bottom-8">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo">Demo1</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="header-payment"
      style={{
        backgroundColor: "#F5F6FA",
        alignItems: "center",
      }}>
      <div className="payment-request">Payment Request</div>
      <div className="right-header">
        <div className="export-file padding-10 bg-header-payment color-header-payment">
          {" "}
          <TbArrowBarToRight />
          <span className="padding-left-6 padding-right-6">Export Excel</span>
        </div>
        <div className="filter padding-10 bg-header-payment color-header-payment">
          <FaFilter />{" "}
          <Dropdown overlay={menu} trigger={["click"]}>
            <a onClick={toggleFormVisibility}>
              <Space>Filter</Space>
            </a>
          </Dropdown>
          <RiArrowDownSFill />{" "}
        </div>

        <div className="create-new padding-10 bg-create-new color-white">
          {" "}
          <span className="plus-payment-new">+</span>Create New
        </div>
      </div>
    </Header>
  );
};

export default HeaderPayment;
