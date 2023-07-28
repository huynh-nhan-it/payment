import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppDispatch, store } from "./Store";
import FormRequest from "./FormRequest";
import TableRequest from "./TableRequest";
import AttachmentRequest from "./AttachmentRequest";
import ApproverRequest from "./ApproverRequest";
import useFormData from "./useData";
import { useDispatch } from "react-redux";
import { submitForm } from "./SubmitAPI";
import { Button, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import HeaderRequest from "../Request/HeaderRequest";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import { Col, Row } from "antd";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsFillSendFill } from "react-icons/bs";
import { MdDrafts } from "react-icons/md";
const App: React.FC = () => {
  const formData = useFormData();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickCard = () => {};
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleFormSubmit = () => {
    // Gọi action submitForm
    dispatch(submitForm(formData));
    console.log(formData);
    console.log(formData.type.typeState);
    console.log(formData.approve.ListApproveAPI);
    navigate("/request/payment");
  };

  return (
    <div>
      <Layout>
        <HeaderRequest />
        <Content>
          <Layout>
            <Sider
              className="sider-request"
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                height: "100%",
                borderRight: "solid #ccc 0.1px",
              }}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}>
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                style={{
                  width: 200,
                }}
              />
              <NavbarRequest />
            </Sider>
            <Content
              style={{ paddingLeft: collapsed ? "0" : "200px" }}
              className="content-request">
              <Header
                style={{
                  minWidth: "100%",
                  background: "#ccc",
                  position: "fixed",
                  zIndex: 1,
                  top: "64px",
                  backgroundColor: "#F5F6FA",
                }}>
                <Row gutter={24} style={{ paddingLeft: "1.5%" }}>
                  <Col>
                    {" "}
                    <a href="/request/payment" className="text-header">
                      {" "}
                      <TiArrowBackOutline style={{ marginRight: "5px" }} />{" "}
                      Return
                    </a>
                  </Col>
                  <Col>
                    <a href="#" className="text-header">
                      {" "}
                      <MdDrafts style={{ marginRight: "5px" }} /> Save Draft
                    </a>
                  </Col>
                  <Col>
                    <a onClick={handleFormSubmit} href="#" className="text-header">
                      {" "}
                      <BsFillSendFill style={{ marginRight: "5px" }} /> Submit
                    </a>
                  </Col>
                </Row>
              </Header>
              <div style={{ paddingTop: "100px" }}></div>
              <FormRequest />
              <TableRequest />
              <AttachmentRequest />
              <ApproverRequest />
              {/* <Button onClick={handleFormSubmit}>Submit</Button> */}
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
