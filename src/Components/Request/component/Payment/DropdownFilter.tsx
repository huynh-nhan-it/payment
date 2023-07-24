import React, { useState } from "react";
import {
  Dropdown,
  Menu,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RiArrowDownSFill } from "react-icons/ri";
import { RootState } from "./store";
import { connect, ConnectedProps } from "react-redux";
import { applyFilter, resetFilter } from "./actions";
import dayjs, { Dayjs } from "dayjs";

interface FilterFormProps extends ConnectedProps<typeof connector> {}

const DropdownFilter: React.FC<FilterFormProps> = ({
  applyFilter,
  resetFilter,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  // const [dataSubmit, setDataSubmit] = useState({purpose:'', requestCode:'', createdDateFrom:'', createDateTo:'', createBy:'', status:''})
  const [purpose, setPurpose] = useState("");
  const [requestCode, setRequestCode] = useState("");
  const [createdDateFrom, setCreatedDateFrom] = useState("");
  const [createdDateTo, setCreateDateTo] = useState("");
  const [createdBy, setCreateBy] = useState("");
  const [status, setStatus] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilter(
      purpose,
      requestCode,
      createdDateFrom,
      createdDateTo,
      createdBy,
      status
    );
  };

  const handleReset = () => {
    setPurpose("");
    setRequestCode("");
    setCreatedDateFrom("");
    setCreateDateTo("");
    setCreateBy("");
    resetFilter();
  };
  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event propagation
  };
  // Convert createdDateFrom to a Dayjs object
  const dayjsDateFrom = createdDateFrom
    ? dayjs(createdDateFrom, "YYYY-MM-DD")
    : null;
  const dayjsDateTo = createdDateTo ? dayjs(createdDateTo, "YYYY-MM-DD") : null;

  const menu = (
    <Menu style={{ right: "-26px", top: "10px" }}>
      <Menu.Item key="form">
        <Form
          onClick={handleFormClick}
          style={{ width: "300px" }}
          className="padding-bottom-12">
          <Form.Item label="Filter">
            <Button
              onClick={handleReset}
              type="primary"
              className="clear-payment">
              Clear
            </Button>
            <Button
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              className="apply-payment">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Purpose"
            labelAlign="left"
            className="margin-bottom-8">
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Request Code"
            labelAlign="left"
            className="margin-bottom-8">
            <Input
              value={requestCode}
              onChange={(e) => setRequestCode(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Created"
            labelAlign="left"
            className="margin-bottom-8">
            <DatePicker
              className="width-100 margin-bottom-8"
              format="YYYY-MM-DD"
              value={dayjsDateFrom}
              onChange={(e, eString) => setCreatedDateFrom(eString)}
            />
            <DatePicker
              className="width-100"
              format="YYYY-MM-DD"
              value={dayjsDateTo}
              onChange={(e, eString) => setCreateDateTo(eString)}
            />
          </Form.Item>
          <Form.Item
            label="Select"
            labelCol={{ span: 24 }}
            className="margin-bottom-8">
            <Select value={createdBy} onChange={(e) => setCreateBy(e)}>
              {/* <Select.Option key={1} value="demo">
                Demo
              </Select.Option>
              <Select.Option key={2} value="demo1">
                Demo1
              </Select.Option> */}

              <Select.Option key={1} value="demo">
                Demo
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            labelCol={{ span: 24 }}
            className="margin-bottom-8">
            <Select value={status} onChange={(e) => setStatus(e)}>
              <Select.Option key={1} value="demo">
                Demo
              </Select.Option>
              <Select.Option key={2} value="demo1">
                Demo1
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a style={{ color: "#8894A1" }} onClick={toggleFormVisibility}>
        <Space>Filter</Space>
        <RiArrowDownSFill />{" "}
      </a>
    </Dropdown>
  );
};

// Hàm mapStateToProps để map state từ Redux store thành props của component
const mapStateToProps = (state: RootState) => {
  return {};
};

// Hàm mapDispatchToProps để map các action creators thành props của component
const mapDispatchToProps = {
  applyFilter,
  resetFilter,
};

// Kết nối component với Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(DropdownFilter);
