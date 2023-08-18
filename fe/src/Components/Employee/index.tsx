import React, { useState } from "react";
import { Layout, Menu, Input, theme } from "antd";
import InforUser from "./InforUser";
import HeaderRequest from "../Request/HeaderRequest";
import NavbarRequest from "../Request/NavbarRequest";
import NavbarSetting from "../Setting/components/System/Structure-Organization/Navbar/NavbarSetting";

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
              width={226}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}>
              <NavbarSetting />
            </Sider>
            <Content
              style={{ paddingLeft: collapsed ? "0" : "226px" }}
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
