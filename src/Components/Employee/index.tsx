import React, { useState } from "react";
import { Layout, Menu, Input, theme } from "antd";
import InforUser from "./InforUser";
import HeaderRequest from "../Request/HeaderRequest";
import NavbarRequest from "../Request/NavbarRequest";

const { Search } = Input;
const { Content, Sider } = Layout;
const Employee: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

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
              <InforUser />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default Employee;
