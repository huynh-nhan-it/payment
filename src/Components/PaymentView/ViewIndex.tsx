import { Layout, theme } from "antd";
import ViewHeader from "./components/Header";
import ViewContent from "./components/Content";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderRequest from "../Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
function ViewPayment() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { requestCode } = useParams();
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
              style={{ paddingLeft: collapsed ? "0" : "200px" }}
              className="content-request">
              <ViewHeader></ViewHeader>
              <div>{requestCode && <ViewContent />}</div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}

export default ViewPayment;
