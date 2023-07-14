import React, { useState } from 'react';
import { Dropdown, Menu, Button, Form, Input, Select, DatePicker, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RiArrowDownSFill } from 'react-icons/ri';

interface SubmitData {
  purpose: string;
  requestcode: string;
  createdDateFrom: Date;
  createDateTo: Date;
  createBy: string;
  status: string;
}

const DropdownFilter: React.FC = (SubmitData) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [dataSubmit, setDataSubmit] = useState({purpose:'', requestCode:'', createdDateFrom:'', createDateTo:'', createBy:'', status:''})
  const [purpose, setPurpose] = useState('')
  const [requestCode, setRequestCode] = useState('')
  const [createdDateFrom, setCreatedDateFrom] = useState('')
  const [createDateTo, setCreateDateTo] = useState('')
  const [createBy, setCreateBy] = useState('')
  const [status, setStatus] = useState('')

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleSubmit = (values: any) => {
    // console.log("Form values:", values);
    setDataSubmit({purpose, requestCode, createdDateFrom, createDateTo, createBy, status})
  };
  // console.log(dataSubmit);


  // console.log(dataSubmit);
  
  // console.log(dataSubmit);
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
  };

  const handleChangeInputPurpose = (e: any) => {
    // console.log(e.target.value);
    setPurpose(e.target.value)
  }

  const handleChangeInputRequestCode = (e: any) => {
    // console.log(e.target.value);
    setRequestCode(e.target.value)
  }

  const handleChangeDateFrom = (e: any, dateString: any) => {
    // console.log(e, dateString);
    setCreatedDateFrom(e)

  }
  const handleChangeDateTo = (e: any, dateString: any) => {
    // console.log(e, dateString);
    setCreateDateTo(e)
  }

  const handleChangeCreatedBy = (e:any)=>{
    // console.log(e);
    setCreateBy(e)
  }

  const handleChangeStatus = (e: any)=>{
    // console.log(e);
    setStatus(e)
  }

  const handleClear = () =>{
    setCreateBy('')
    setCreateDateTo('')
    setCreatedDateFrom('')
    setStatus('')
    setPurpose('')
    setRequestCode('')
  }


  const menu = (
    <Menu style={{ right: "-26px", top: "10px" }}>
      <Menu.Item key="form">
        <Form
          onClick={handleFormClick}
          style={{ width: "300px" }}
          className="padding-bottom-12">
          <Form.Item label="Filter">
            <Button onClick={handleClear} type="primary" className="clear-payment">
              Clear
            </Button>
            <Button onClick={handleSubmit} type="primary" htmlType="submit" className="apply-payment">
              Submit
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Purpose"
            labelAlign="left"
            className="margin-bottom-8">
            <Input value={purpose} onChange={handleChangeInputPurpose} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Request Code"
            labelAlign="left"
            className="margin-bottom-8">
            <Input value={requestCode} onChange={handleChangeInputRequestCode} />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}
            label="Created"
            labelAlign="left"
            className="margin-bottom-8">
            <DatePicker className="width-100 margin-bottom-8" format="DD/MM/YYYY" onChange={handleChangeDateFrom} />
            <DatePicker className="width-100" format="DD/MM/YYYY" onChange={handleChangeDateTo} />
          </Form.Item>
          <Form.Item label="Select" labelCol={{ span: 24 }} className="margin-bottom-8">
            <Select value={createBy} onChange={handleChangeCreatedBy}>
              <Select.Option key={1} value="demo">Demo</Select.Option>
              <Select.Option key={2} value="demo1">Demo1</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item  label="Select" labelCol={{ span: 24 }} className="margin-bottom-8">
            <Select value={status} onChange={handleChangeStatus}>
              <Select.Option key={1} value="demo">Demo</Select.Option>
              <Select.Option key={2} value="demo1">Demo1</Select.Option>
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
