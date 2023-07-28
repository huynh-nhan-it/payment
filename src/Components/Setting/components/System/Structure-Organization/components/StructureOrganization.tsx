import React, { useState } from "react";
import HeaderOrganize from "./Header/Header";
import NavbarDepartment from "./Content/Navbar";
import { Layout, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import HeaderRequest from "../../../../../Request/HeaderRequest";
import NavbarRequest from "../../../../../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import NavbarSetting from "../Navbar/NavbarSetting";

const StructureOrganization = () => {
  const handleClickCard = () => {};
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
              <NavbarSetting />
            </Sider>
            <Content
              style={{
                paddingLeft: collapsed ? "0" : "200px",
                marginTop: "100px",
              }}
              className="content-request">
              <HeaderOrganize />
              <NavbarDepartment />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};

export default StructureOrganization;
