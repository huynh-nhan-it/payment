import React from 'react'
import { Layout, Menu, Input, theme } from "antd";
import InforUser from './InforUser';
import HeaderRequest from '../Request/HeaderRequest';
import NavbarRequest from '../Request/NavbarRequest';

const { Search } = Input;
const { Content, Sider} = Layout;
const Employee:React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
   <Layout>
      <HeaderRequest/>
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
            padding: "0 12px",
          }}>
          <InforUser />
        </Content>
        </Layout>
      </Content>
     
    </Layout>
  )
}

export default Employee