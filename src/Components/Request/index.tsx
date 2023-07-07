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

import { Layout, Input, theme } from "antd";
import React from "react";

import PaymentAll from "../Payment";
import HeaderRequest from "./HeaderRequest";
import NavbarRequest from "./NavbarRequest";
const { Search } = Input;
const { Content, Sider} = Layout;
const Request: React.FC = () => {
  const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <Layout>
      <HeaderRequest />
      <Content>
        <Layout >
        <Sider
          style={{
            background: colorBgContainer,
          }}
          width={200}>
          <Search
            placeholder="input search text"
            // onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <NavbarRequest/>
        </Sider>
        <Content
          style={{
            padding: "0 px",
          }}>
          <PaymentAll />
        </Content>
        </Layout>
      </Content>
     
    </Layout>
  );
};
export default Request;
