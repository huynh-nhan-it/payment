import React from 'react'
import { Layout, Menu, Input, theme } from "antd";
import InforUser from './InforUser';
import HeaderRequest from '../Request/HeaderRequest';
import NavbarRequest from '../Request/NavbarRequest';

const { Search } = Input;
const { Content, Sider } = Layout;
const Employee: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (

    <div style={{paddingTop:64}}>
      <InforUser />
    </div>


  )
}

export default Employee