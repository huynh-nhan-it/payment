// import React from "react";
// import PaymentAll from "./Payment";
// import NavbarRequest from "./NavbarRequest";
// import './request.css'

// const Request = () => {
//   return (
//     <div className="wrapper">
//       <NavbarRequest />
//       <PaymentAll />
//     </div>
//   );
// };

// export default Request;

import React, { useState } from "react";

import PaymentAll from "./component/Payment";
import { Layout, theme } from "antd";
import HeaderRequest from "./HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Search from "antd/es/input/Search";
import NavbarRequest from "./NavbarRequest";
const Request: React.FC = () => {
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
              <PaymentAll />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
};
export default Request;
