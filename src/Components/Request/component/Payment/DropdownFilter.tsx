import React, { useState } from 'react';
import { Dropdown, Menu, Button, Form, Input, Select, DatePicker, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RiArrowDownSFill } from 'react-icons/ri';

const DropdownFilter: React.FC = () => {
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

  const handleChangeInput = (e: any) => {
    console.log(e.target.value);
  }

  const handleChangeDate = (e: any, dateString: any) => {
    console.log(e, dateString);
  }
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
            <Input onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Request Code"
            labelAlign="left"
            className="margin-bottom-8">
            <Input onChange={handleChangeInput} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Created"
            labelAlign="left"
            className="margin-bottom-8">
            <DatePicker className="width-100 margin-bottom-8" format="DD/MM/YYYY" onChange={handleChangeDate} />
            <DatePicker className="width-100" format="DD/MM/YYYY" onChange={handleChangeDate} />
          </Form.Item>
          <Form.Item label="Select" labelCol={{ span: 24 }} className="margin-bottom-8">
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
    <Dropdown overlay={menu} trigger={["click"]}>
      <a onClick={toggleFormVisibility}>
        <Space>Filter</Space>
        <RiArrowDownSFill />{" "}
      </a>
    </Dropdown>
  );
};

export default DropdownFilter;
