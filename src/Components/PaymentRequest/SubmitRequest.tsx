import React, { useState } from "react";
import FormRequest from "./FormRequest";
import TableRequest from "./TableRequest";
import AttachmentRequest from "./AttachmentRequest";
import ApproverRequest from "./ApproverRequest";
import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import HeaderRequest from "../Request/HeaderRequest";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import HeaderCreateRequest from "../Request/component/CreateRequest/Header";

const ParentComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
            // collapsedWidth="0"
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
            style={{ paddingLeft: collapsed ? "0" : "200px", marginTop: "100px" }}
            className="content-request">
              <HeaderCreateRequest/>
            <FormRequest />
            <TableRequest
              onChange={function (data: { paymentMethod: string }): void {
                throw new Error("Function not implemented.");
              }}
            />
            <AttachmentRequest />
            <ApproverRequest />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default ParentComponent;
